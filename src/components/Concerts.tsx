import React, { useState } from "react";

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

interface ConcertsProps {
  concerts: Concert[];
}

const Concerts = ({ concerts }: ConcertsProps) => {
  const [selectedConcerts, setSelectedConcerts] = useState("Upcoming Concerts");

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

  const filteredConcerts =
    selectedConcerts === "Upcoming Concerts"
      ? concerts.filter((concert) => {
          const currentDate = new Date();
          const concertDate = new Date(
            concert.startDate.year || 0,
            monthToIndex(concert.startDate.month),
            concert.startDate.day || 1
          );
          return concertDate > currentDate;
        })
      : concerts.filter((concert) => {
          const currentDate = new Date();
          const concertDate = new Date(
            concert.startDate.year || 0,
            monthToIndex(concert.startDate.month),
            concert.startDate.day || 1
          );
          return concertDate <= currentDate;
        });

  const renderedConcerts = (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {filteredConcerts.map((concert) => {
        return (
          <article className="rounded-xl border-2 border-gray-100 bg-white">
            <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
              <div>
                <h3 className="font-medium sm:text-lg">
                  <a
                    href={
                      concert.ticketUrl
                        ? concert.ticketUrl
                        : concert.moreInfoUrl
                    }
                    className="hover:underline"
                  >
                    {concert.venue}
                  </a>
                </h3>
                <p
                  className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 hover:underline cursor-pointer decoration-dotted"
                  onClick={() => openMap(concert.location)}
                >
                  {concert.location}
                </p>

                <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                  <div className="flex items-center gap-1 text-gray-500">
                    <p className="text-xs">
                      {concert.startDate.month} {concert.startDate.day} {concert.startDate.year}
                    </p>
                  </div>

                  {selectedConcerts === "Upcoming Concerts" && concert.time && <>

                  <span className="hidden sm:block" aria-hidden="true">
                    &middot;
                  </span>

                  <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                    {concert.time}
                  </p>
                  </>
                  }
                </div>
              </div>
            </div>

            {/* Conditionally render the ticket purchase or more info link */}
            {selectedConcerts === "Upcoming Concerts" && (
              <div className="flex justify-end">
                <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-[#660000] hover:bg-[#990000] px-4 py-2 text-white">
                  <a
                    href={
                      concert.ticketUrl
                        ? concert.ticketUrl
                        : concert.moreInfoUrl
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                    className="block text-center text-xs font-bold uppercase text-white transition-all  rounded-br-md "
                  >
                    {concert.ticketUrl ? "Purchase Tickets" : "More Info"}
                  </a>
                </strong>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );

  return (
    <section className="concerts-section">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <details className="relative group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-center gap-2 pb-1">
              <h2 className="text-3xl font-bold sm:text-4xl">
                {selectedConcerts}
              </h2>

              <span className="transition group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2 left-0 right-0">
              <div className="w-full rounded border border-gray-200 bg-white ">
                <ul className="space-y-0.5 border-t border-gray-200 w-full">
                  <li
                    className={`h-full w-full ${
                      selectedConcerts === "Upcoming Concerts"
                        ? "bg-gray-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <button
                      className="text-sm font-medium text-gray-700 w-full h-full p-4"
                      onClick={() => setSelectedConcerts("Upcoming Concerts")}
                    >
                      Upcoming Concerts
                    </button>
                  </li>

                  <li
                    className={`h-full w-full ${
                      selectedConcerts === "Past Concerts"
                        ? "bg-gray-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <button
                      className="text-sm font-medium text-gray-700 w-full h-full p-4"
                      onClick={() => setSelectedConcerts("Past Concerts")}
                    >
                      Past Concerts
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </details>

          <p className="mt-4 text-gray-600">
            {selectedConcerts === "Upcoming Concerts"
              ? filteredConcerts.length > 0
                ? "Come and join us for one of our live performances!"
                : "No upcoming concerts at the moment. Stay tuned for future events!"
              : filteredConcerts.length > 0
              ? "Thank you for joining us at our past concerts!"
              : "No past concerts found. Check out our upcoming events!"}
          </p>
        </div>
        {renderedConcerts}
      </div>
    </section>
  );
};

export default Concerts;
