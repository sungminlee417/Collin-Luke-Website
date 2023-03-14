import React from "react";
import { useState } from "react";

const Concerts = () => {
  return (
    <section className="concerts-section flex flex-col gap-14 md:m-20 m-12">
      <h2 className="text-4xl">Concerts</h2>
      <ul className="flex flex-col gap-10 py-12 m-12">
        <li className="bg-white p-12 shadow-sm hover:shadow-md hover:translate-x-1 transition rounded-lg cursor-pointer">
          <a
            className="flex gap-20"
            href="https://www.eventbrite.com/e/muse-duo-experiments-2023-album-release-tour-tickets-579064626887?aff=odcleoeventsincollection"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="text-4xl">
              <div>08</div>
              <div>April</div>
            </div>
            <div className="flex flex-col gap-4 flex-grow">
              <div className="text-5xl">
                Muse Duo: Experiments, 2023 Album Release Tour
              </div>
              <div className="flex gap-4">
                <div className="flex gap-1 items-center">
                  <i className="fa-solid fa-clock"></i>
                  <div className="text-xl">2:00 PM EDT</div>
                </div>
                <div className="flex gap-1 items-center">
                  <i className="fa-solid fa-location-dot"></i>
                  <div className="text-xl">
                    <strong>Snyder Sanctuary</strong> North Military Trail Boca
                    Raton, FL 33431
                  </div>
                </div>
              </div>
            </div>
            <a
              className="self-center justify-self-end text-2xl text-white bg-orange-500 px-8 py-4 rounded-md"
              href="https://www.eventbrite.com/e/muse-duo-experiments-2023-album-release-tour-tickets-579064626887?aff=odcleoeventsincollection"
              rel="noopener noreferrer"
              target="_blank"
            >
              Tickets
            </a>
          </a>
        </li>
        <li className="bg-white p-12 shadow-sm hover:shadow-md hover:translate-x-1 transition rounded-lg cursor-pointer">
          <a
            className="flex gap-20"
            href="https://www.eventbrite.com/e/copy-of-muse-duo-experiments-2023-album-release-tour-tickets-587682944507?aff=odcleoeventsincollection"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="text-4xl">
              <div>15</div>
              <div>April</div>
            </div>
            <div className="flex flex-col gap-4 flex-grow">
              <div className="text-5xl">
                Muse Duo: Experiments, 2023 Album Release Tour
              </div>
              <div className="flex gap-4">
                <div className="flex gap-1 items-center">
                  <i className="fa-solid fa-clock"></i>
                  <div className="text-xl">2:00 PM EDT</div>
                </div>
                <div className="flex gap-1 items-center">
                  <i className="fa-solid fa-location-dot"></i>
                  <div className="text-xl">
                    <strong>Snyder Sanctuary</strong> North Military Trail Boca
                    Raton, FL 33431
                  </div>
                </div>
              </div>
            </div>
            <a
              className="self-center justify-self-end text-2xl text-white bg-orange-500 px-8 py-4 rounded-md"
              href="https://www.eventbrite.com/e/copy-of-muse-duo-experiments-2023-album-release-tour-tickets-587682944507?aff=odcleoeventsincollection"
              rel="noopener noreferrer"
              target="_blank"
            >
              Tickets
            </a>
          </a>
        </li>
        <li className="bg-white p-12 shadow-sm hover:shadow-md hover:translate-x-1 transition rounded-lg cursor-pointer">
          <a
            className="flex gap-20"
            href="https://www.eventbrite.com/e/sunshine-cathedral-center-for-the-performing-arts-presents-muse-duo-tickets-538604740277"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div className="text-4xl">
              <div>20</div>
              <div>May</div>
            </div>
            <div className="flex flex-col gap-4 flex-grow">
              <div className="text-5xl">
                Sunshine Cathedral Center for the Performing Arts presents Muse
                Duo
              </div>
              <div className="flex gap-4">
                <div className="flex gap-1 items-center">
                  <i className="fa-solid fa-clock"></i>
                  <div className="text-xl">8:00 PM EDT</div>
                </div>
                <div className="flex gap-1 items-center">
                  <i className="fa-solid fa-location-dot"></i>
                  <div className="text-xl">
                    <strong>1480 SW 9th Ave </strong> 1480 Southwest 9th Avenue
                    Fort Lauderdale, FL 33315
                  </div>
                </div>
              </div>
            </div>
            <a
              className="self-center justify-self-end text-2xl text-white bg-orange-500 px-8 py-4 rounded-md"
              href="https://www.eventbrite.com/e/sunshine-cathedral-center-for-the-performing-arts-presents-muse-duo-tickets-538604740277"
              rel="noopener noreferrer"
              target="_blank"
            >
              Tickets
            </a>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Concerts;
