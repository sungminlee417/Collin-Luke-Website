"use client";

import React, { useEffect, useState } from "react";
import type { Concert } from "../../sanity/lib/types";

interface ConcertsProps {
  concerts: Concert[];
}

const Concerts = ({ concerts }: ConcertsProps) => {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [currentPage, setCurrentPage] = useState(1);
  const CONCERTS_PER_PAGE = 6;

  const isUpcoming = (concert: Concert) => {
    return new Date(concert.date) > new Date();
  };

  const upcomingConcerts = concerts.filter(isUpcoming);
  const pastConcerts = concerts.filter((c) => !isUpcoming(c));

  const allFilteredConcerts = selectedTab === 'upcoming' ? upcomingConcerts : pastConcerts;

  const totalPages = Math.ceil(allFilteredConcerts.length / CONCERTS_PER_PAGE);
  const startIndex = (currentPage - 1) * CONCERTS_PER_PAGE;
  const filteredConcerts = allFilteredConcerts.slice(startIndex, startIndex + CONCERTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear(),
      time: date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    };
  };

  const formatTime = (dateString: string, timezone?: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone || 'UTC'
    });
  };

  return (
    <section className="concerts-section section section-tint">
      <div className="section-inner">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="heading-2 text-muse-red dark:text-red-400 mb-6">Concerts</h2>
          
          {/* Tab Navigation */}
          <div className="inline-flex bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
            <button
              onClick={() => setSelectedTab('upcoming')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedTab === 'upcoming'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setSelectedTab('past')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedTab === 'past'
                  ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              Past
            </button>
          </div>
        </div>

        {/* Concert List */}
        <div className="max-w-4xl mx-auto">
          {filteredConcerts.length > 0 ? (
            <div className="space-y-4">
              {filteredConcerts.map((concert) => {
                const dateInfo = formatDate(concert.date);
                const isUpcomingConcert = isUpcoming(concert);
                
                return (
                  <div
                    key={concert.slug}
                    className="card card-hover p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Date */}
                      <div className="flex-shrink-0">
                        <div className="bg-accent-500 text-white rounded-xl p-3 text-center min-w-[80px]">
                          <div className="text-2xl font-bold">{dateInfo.day}</div>
                          <div className="text-xs uppercase tracking-wide">{dateInfo.month}</div>
                          <div className="text-xs opacity-90">{dateInfo.year}</div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                              {concert.title}
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400 mb-1">
                              {concert.venue}
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {concert.location}
                            </p>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                              {formatTime(concert.date, concert.timezone)}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3 mt-3 sm:mt-0">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              isUpcomingConcert
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                            }`}>
                              {isUpcomingConcert ? 'Upcoming' : 'Past'}
                            </span>
                            
                            {concert.ticketUrl && isUpcomingConcert && (
                              <a
                                href={concert.ticketUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary text-sm px-4 py-2"
                              >
                                Tickets
                              </a>
                            )}
                          </div>
                        </div>

                        {concert.description && (
                          <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {concert.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-neutral-400 dark:text-neutral-600 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                No {selectedTab} concerts
              </h3>
              <p className="text-neutral-400 dark:text-neutral-500">
                {selectedTab === 'upcoming' 
                  ? 'Check back soon for new performance announcements' 
                  : 'Our concert history will appear here'
                }
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-accent-500 hover:text-white shadow-sm'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page numbers */}
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-accent-500 text-white'
                        : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400 cursor-not-allowed'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-accent-500 hover:text-white shadow-sm'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Results count */}
          {allFilteredConcerts.length > 0 && (
            <div className="text-center mt-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Showing {startIndex + 1}-{Math.min(startIndex + CONCERTS_PER_PAGE, allFilteredConcerts.length)} of {allFilteredConcerts.length} {selectedTab} concerts
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Concerts;