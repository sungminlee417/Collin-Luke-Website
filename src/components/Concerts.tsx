import React from "react";

const Concerts = () => {
  const openMap = () => {
    window.open(
      "https://www.google.com/maps/place/Snyder+Sanctuary/@26.3837724,-80.1245195,17z/data=!3m1!4b1!4m6!3m5!1s0x88d91e6a9dc43fe7:0xcca1a0c62aed3b33!8m2!3d26.3837676!4d-80.1223308!16s%2Fg%2F11c55jc9g7"
    );
  };
  return (
    <section className="concerts-section flex flex-col gap-14 md:m-20 m-12">
      <h2 className="text-4xl">Concerts</h2>
      <div className="flex items-center">
        <ul className="flex flex-col gap-12 lg:mx-12 first">
          <li className="bg-white lg:p-12 p-10 shadow-sm hover:shadow-md hover:translate-x-1 transition rounded-lg cursor-pointer">
            <a
              className="flex md:flex-row md:gap-20 gap-10 flex-col"
              // href="https://www.eventbrite.com/e/muse-duo-experiments-2023-album-release-tour-tickets-579064626887?aff=odcleoeventsincollection"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="text-4xl">
                <div>08</div>
                <div>April</div>
              </div>
              <div className="flex flex-col md:gap-4 gap-8 flex-grow">
                <div className="text-5xl">
                  Muse Duo: Experiments, 2023 Album Release Tour
                </div>
                <div className="flex gap-6">
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-clock"></i>
                    <div className="text-xl">2:00PM EDT</div>
                  </div>
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="text-xl" onClick={openMap}>
                      <strong>Snyder Sanctuary</strong> North Military Trail
                      Boca Raton, FL 33431
                    </div>
                  </div>
                </div>
              </div>
              {/* <a
                className="md:self-center self-start justify-self-end text-2xl text-white bg-orange-500 px-8 py-4 rounded-md"
                href="https://www.eventbrite.com/e/muse-duo-experiments-2023-album-release-tour-tickets-579064626887?aff=odcleoeventsincollection"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tickets
              </a> */}
            </a>
          </li>
          <li className="bg-white lg:p-12 p-10 shadow-sm hover:shadow-md hover:translate-x-1 transition rounded-lg cursor-pointer">
            <a
              className="flex md:flex-row md:gap-20 gap-10 flex-col"
              // href="https://www.eventbrite.com/e/copy-of-muse-duo-experiments-2023-album-release-tour-tickets-587682944507?aff=odcleoeventsincollection"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="text-4xl">
                <div>15</div>
                <div>April</div>
              </div>
              <div className="flex flex-col md:gap-4 gap-8 flex-grow">
                <div className="text-5xl">
                  Muse Duo: Experiments, 2023 Album Release Tour
                </div>
                <div className="flex gap-6">
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-clock"></i>
                    <div className="text-xl">2:00PM EDT</div>
                  </div>
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="text-xl">
                      <strong>Snyder Sanctuary</strong> North Military Trail
                      Boca Raton, FL 33431
                    </div>
                  </div>
                </div>
              </div>
              {/* <a
                className="md:self-center self-start justify-self-end text-2xl text-white bg-orange-500 px-8 py-4 rounded-md"
                href="https://www.eventbrite.com/e/copy-of-muse-duo-experiments-2023-album-release-tour-tickets-587682944507?aff=odcleoeventsincollection"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tickets
              </a> */}
            </a>
          </li>
          <li className="bg-white lg:p-12 p-10 shadow-sm hover:shadow-md hover:translate-x-1 transition rounded-lg cursor-pointer">
            <a
              className="flex md:flex-row md:gap-20 gap-10 flex-col"
              href="https://www.eventbrite.com/e/sunshine-cathedral-center-for-the-performing-arts-presents-muse-duo-tickets-538604740277"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="text-4xl">
                <div>20</div>
                <div>May</div>
              </div>
              <div className="flex flex-col md:gap-4 gap-8 flex-grow">
                <div className="text-5xl">
                  Sunshine Cathedral Center for the Performing Arts presents
                  Muse Duo
                </div>
                <div className="flex gap-6">
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-clock"></i>
                    <div className="text-xl">8:00PM EDT</div>
                  </div>
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="text-xl">
                      <strong>1480 SW 9th Ave </strong> 1480 Southwest 9th
                      Avenue Fort Lauderdale, FL 33315
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="md:self-center self-start justify-self-end text-2xl text-white bg-orange-500 px-8 py-4 rounded-md"
                href="https://www.eventbrite.com/e/sunshine-cathedral-center-for-the-performing-arts-presents-muse-duo-tickets-538604740277"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tickets
              </a>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Concerts;
