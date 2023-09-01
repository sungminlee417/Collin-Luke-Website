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
                      {concert.startDate.month} {concert.startDate.day}
                    </p>
                  </div>

                  <span className="hidden sm:block" aria-hidden="true">
                    &middot;
                  </span>

                  <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                    {concert.startDate.year}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <strong className="-mb-[2px] -me-[2px] inline-flex items-center gap-1 rounded-ee-xl rounded-ss-xl bg-[#660000] hover:bg-[#990000] px-4 py-2 text-white">
                <a
                  href={
                    concert.ticketUrl ? concert.ticketUrl : concert.moreInfoUrl
                  }
                  rel="noopener noreferrer"
                  target="_blank"
                  className="block text-center text-xs font-bold uppercase text-white transition-all  rounded-br-md "
                >
                  {concert.ticketUrl ? "Purchase Tickets" : "More Info"}
                </a>
              </strong>
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
