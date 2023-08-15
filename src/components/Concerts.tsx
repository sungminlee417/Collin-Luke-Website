import React from "react";

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
  const openMap = (address: string): void => {
    window.open(
      `https://maps.google.com/maps?q=${encodeURIComponent(address)}`
    );
  };

  const renderedConcerts = (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {concerts.map((concert) => {
        return (
          <article className="flex bg-white transition hover:shadow-xl rounded-md">
            <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
              <time className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
                <span>{concert.startDate.year}</span>
                <span className="w-px flex-1 bg-gray-900/10"></span>
                <span>
                  {concert.startDate.month} {concert.startDate.day}
                </span>
              </time>
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                <h3 className="font-bold uppercase text-gray-900">
                  {concert.venue}
                </h3>

                <p
                  className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700 hover:underline cursor-pointer decoration-dotted"
                  onClick={() => openMap(concert.location)}
                >
                  {concert.location}
                </p>
              </div>

              <div className="sm:flex sm:items-end sm:justify-end">
                <a
                  href={
                    concert.ticketUrl ? concert.ticketUrl : concert.moreInfoUrl
                  }
                  rel="noopener noreferrer"
                  target="_blank"
                  className="block bg-[#660000] px-5 py-3 text-center text-xs font-bold uppercase text-white transition-all hover:bg-[#990000] rounded-br-md "
                >
                  {concert.ticketUrl ? "Purchase Tickets" : "More Info"}
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );

  return (
    <section className="concerts-section">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Upcoming Concerts</h2>

          <p className="mt-4 text-gray-600">
            Come and join us for one of our live performances!
          </p>
        </div>
        {renderedConcerts}
      </div>
    </section>
  );
};

export default Concerts;
