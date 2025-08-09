"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Concert {
  startDate: {
    day: number;
    month: string;
    year?: number;
  };
  endDate?: {
    day: number;
    month: string;
  };
  venue: string;
  time?: string;
  location: string;
  ticketUrl?: string;
  moreInfoUrl?: string;
}

const Concerts = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [selectedConcerts, setSelectedConcerts] = useState("Upcoming Concerts");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const CONCERTS_PER_PAGE = 4;

  const openMap = (address: string): void => {
    window.open(
      `https://maps.google.com/maps?q=${encodeURIComponent(address)}`
    );
  };

  function monthToIndex(month: string) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months.indexOf(month);
  }

  const isUpcoming = (concert: Concert) => {
    const currentDate = new Date();
    const concertDate = new Date(
      concert.startDate.year || 0,
      monthToIndex(concert.startDate.month),
      concert.startDate.day || 1
    );
    return concertDate > currentDate;
  };

  const upcomingConcerts = concerts.filter(isUpcoming);
  const pastConcerts = concerts.filter((c) => !isUpcoming(c));

  // Pagination logic for past concerts
  const totalPages = Math.ceil(pastConcerts.length / CONCERTS_PER_PAGE);
  const startIndex = (currentPage - 1) * CONCERTS_PER_PAGE;
  const paginatedPastConcerts = pastConcerts.slice(
    startIndex,
    startIndex + CONCERTS_PER_PAGE
  );

  const filteredConcerts =
    selectedConcerts === "Upcoming Concerts"
      ? upcomingConcerts
      : paginatedPastConcerts;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = collection(db, "concerts/");
        onSnapshot(docRef, (querySnapshot) => {
          const concertsData = querySnapshot.docs.map((doc) => {
            const data = doc.data() as Concert;
            return data;
          });
          concertsData.sort((a, b) => {
            const dateA = new Date(
              a.startDate.year || 0,
              monthToIndex(a.startDate.month),
              a.startDate.day || 1
            );
            const dateB = new Date(
              b.startDate.year || 0,
              monthToIndex(b.startDate.month),
              b.startDate.day || 1
            );
            return dateB.getTime() - dateA.getTime();
          });
          setConcerts(concertsData);
          console.log(`Loaded ${concertsData.length} concerts from Firebase`);
        });
      } catch (error) {
        console.error("Firebase error:", error);
        // Fallback to empty array if Firebase fails
        setConcerts([]);
      }
    };

    fetchData();
  }, []);

  // Reset pagination when switching between upcoming/past concerts
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedConcerts]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  const ConcertCard = ({
    concert,
    index,
  }: {
    concert: Concert;
    index: number;
  }) => {
    const isUpcomingConcert = isUpcoming(concert);

    return (
      <motion.div
        className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          type: "spring",
          stiffness: 100,
        }}
        whileHover={{ y: -5, scale: 1.02 }}
        viewport={{ once: true }}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-muse-red/5 dark:to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Status indicator */}
        <div className="absolute top-4 right-4 z-10">
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
              isUpcomingConcert
                ? "bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30"
                : "bg-gray-500/20 text-gray-600 dark:text-gray-400 border border-gray-500/30"
            }`}
          >
            {isUpcomingConcert ? "Upcoming" : "Past"}
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Date Display */}
            <div className="flex-shrink-0">
              <motion.div
                className="relative bg-gradient-to-br from-muse-red via-red-500 to-red-600 text-white rounded-2xl p-4 shadow-xl overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <div className="relative text-center">
                  <div className="text-3xl lg:text-4xl font-bold leading-none">
                    {concert.startDate.day}
                  </div>
                  <div className="text-sm uppercase tracking-widest font-medium mt-1 opacity-90">
                    {concert.startDate.month.slice(0, 3)}
                  </div>
                  <div className="text-xs mt-1 opacity-80">
                    {concert.startDate.year}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Concert Details */}
            <div className="flex-grow space-y-4">
              <div>
                <h3 className="text-2xl lg:text-3xl font-light text-gray-900 dark:text-white mb-2 group-hover:text-muse-red dark:group-hover:text-red-400 transition-colors duration-300">
                  {concert.venue}
                </h3>

                {concert.time && (
                  <motion.div
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-400 mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="font-medium">{concert.time}</span>
                  </motion.div>
                )}

                <motion.div
                  className="flex items-start gap-3 text-gray-600 dark:text-gray-400 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span
                    className="cursor-pointer hover:text-muse-red dark:hover:text-red-400 transition-colors duration-200 hover:underline decoration-2 underline-offset-2"
                    onClick={() => openMap(concert.location)}
                  >
                    {concert.location}
                  </span>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {concert.ticketUrl && (
                  <motion.a
                    href={concert.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-muse-red to-red-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                    <svg
                      className="w-5 h-5 relative z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                    <span className="relative z-10">Purchase Tickets</span>
                  </motion.a>
                )}
                {concert.moreInfoUrl && (
                  <motion.a
                    href={concert.moreInfoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-center gap-3 px-6 py-3 border-2 border-muse-red dark:border-red-400 text-muse-red dark:text-red-400 rounded-xl font-medium hover:bg-muse-red dark:hover:bg-red-600 hover:text-white hover:border-transparent transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>More Info</span>
                  </motion.a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="concerts-section bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container-custom section-padding">
        <div className="text-center mb-16">
          <motion.div
            className="inline-block mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative dropdown-container">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex cursor-pointer items-center justify-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-muse-red to-red-600 rounded-full animate-pulse" />
                  <h2 className="text-2xl lg:text-3xl font-light text-gray-900 dark:text-white">
                    {selectedConcerts}
                  </h2>
                </div>
                <motion.span
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg transition-transform duration-300"
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <svg
                    className="w-5 h-5 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.span>
              </motion.button>

              {isDropdownOpen && (
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 min-w-full"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-sm">
                    <div className="p-2">
                      <motion.button
                        onClick={() => {
                          setSelectedConcerts("Upcoming Concerts");
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                          selectedConcerts === "Upcoming Concerts"
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          Upcoming Concerts
                        </div>
                      </motion.button>

                      <motion.button
                        onClick={() => {
                          setSelectedConcerts("Past Concerts");
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                          selectedConcerts === "Past Concerts"
                            ? "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-gray-500 rounded-full" />
                          Past Concerts
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {selectedConcerts === "Upcoming Concerts"
              ? filteredConcerts.length > 0
                ? "Join us for an unforgettable evening of classical music at one of our upcoming performances."
                : "No upcoming concerts at the moment. Stay tuned for future magical performances!"
              : filteredConcerts.length > 0
              ? "Relive the magic of our past performances and see where we've shared our music."
              : "No past concerts found. Check out our upcoming events for future performances!"}
          </motion.p>
        </div>

        <motion.div
          className="grid gap-8 lg:gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {filteredConcerts.length > 0 ? (
            <>
              {filteredConcerts.map((concert, index) => (
                <ConcertCard
                  key={`${selectedConcerts}-${
                    selectedConcerts === "Past Concerts" ? currentPage : 1
                  }-${index}`}
                  concert={concert}
                  index={index}
                />
              ))}

              {/* Pagination for Past Concerts */}
              {selectedConcerts === "Past Concerts" && totalPages > 1 && (
                <motion.div
                  className="flex justify-center items-center gap-4 mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {/* Previous Button */}
                  <motion.button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      currentPage === 1
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-muse-red hover:text-white dark:hover:bg-red-600 shadow-lg hover:shadow-xl"
                    }`}
                    whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                    whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </motion.button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <motion.button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-12 h-12 rounded-xl font-medium transition-all duration-300 ${
                            currentPage === page
                              ? "bg-gradient-to-r from-muse-red to-red-600 text-white shadow-lg"
                              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md hover:shadow-lg"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {page}
                        </motion.button>
                      )
                    )}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      currentPage === totalPages
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-muse-red hover:text-white dark:hover:bg-red-600 shadow-lg hover:shadow-xl"
                    }`}
                    whileHover={
                      currentPage !== totalPages ? { scale: 1.05 } : {}
                    }
                    whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </motion.button>
                </motion.div>
              )}

              {/* Page Info */}
              {selectedConcerts === "Past Concerts" && totalPages > 1 && (
                <motion.div
                  className="text-center mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {startIndex + 1}-
                    {Math.min(
                      startIndex + CONCERTS_PER_PAGE,
                      pastConcerts.length
                    )}{" "}
                    of {pastConcerts.length} past concerts
                  </p>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <svg
                  className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-light text-gray-500 dark:text-gray-400 mb-2">
                {selectedConcerts === "Upcoming Concerts"
                  ? "No upcoming concerts"
                  : "No past concerts"}
              </h3>
              <p className="text-gray-400 dark:text-gray-500">
                {selectedConcerts === "Upcoming Concerts"
                  ? "Check back soon for new performance announcements"
                  : "Our concert history will appear here"}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Concerts;
