import React from "react";

interface Concert {
  startDate: {
    day: number;
    month: string;
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
    <ul className="grid gap-12 lg:mx-10 w-full">
      {concerts.map((concert) => {
        return (
          <li
            key={`${concert.startDate.day}-${concert.startDate.month}`}
            className="bg-white lg:p-12 p-10 shadow-sm hover:shadow-md hover:translate-x-1 transition rounded-lg"
          >
            <div className="flex md:flex-row md:gap-20 gap-10 flex-col">
              <div className="text-4xl">
                <div>
                  {concert.startDate.day}
                  {concert.endDate ? `-${concert.endDate.day}` : ""}
                </div>
                <div>{concert.startDate.month}</div>
              </div>
              <div className="flex flex-col md:gap-4 gap-8 flex-grow">
                <div className="text-5xl">{concert.venue}</div>
                <div className="flex gap-6">
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-clock"></i>
                    <div className="text-xl">{concert.time}</div>
                  </div>
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-location-dot"></i>
                    <div
                      className="text-xl underline decoration-dotted underline-offset-2 cursor-pointer"
                      onClick={() => openMap(concert.location)}
                    >
                      {concert.location}
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="md:self-center self-start justify-self-end text-2xl text-white bg-orange-500 px-8 py-4 rounded-md"
                href={
                  concert.ticketUrl ? concert.ticketUrl : concert.moreInfoUrl
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                {concert.ticketUrl ? "Tickets" : "More Info"}
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section className="concerts-section flex flex-col gap-20 md:m-20 m-12">
      <h2 className="lg:text-7xl text-center text-6xl">Upcoming Concerts</h2>
      <div className="flex items-center">{renderedConcerts}</div>
    </section>
  );
};

export default Concerts;
