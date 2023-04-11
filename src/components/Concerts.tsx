import React from "react";

const Concerts = () => {
  const openMap = (addressURL: string): void => {
    window.open(addressURL);
  };

  return (
    <section className="concerts-section flex flex-col gap-20 md:m-20 m-12">
      <h2 className="lg:text-7xl text-center text-6xl">
        Experiments, 2023 Album Release Tour
      </h2>
      <div className="flex items-center">
        <ul className="grid gap-12 lg:mx-10 w-full">
          <li className="bg-white lg:p-12 p-10 shadow-sm hover:shadow-md hover:translate-x-1 transition rounded-lg">
            <div className="flex md:flex-row md:gap-20 gap-10 flex-col">
              <div className="text-4xl">
                <div>15</div>
                <div>April</div>
              </div>
              <div className="flex flex-col md:gap-4 gap-8 flex-grow">
                <div className="text-5xl">Snyder Sanctuary</div>
                <div className="flex gap-6">
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-clock"></i>
                    <div className="text-xl">2:00PM EDT</div>
                  </div>
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-location-dot"></i>
                    <div
                      className="text-xl underline decoration-dotted underline-offset-2 cursor-pointer"
                      onClick={() =>
                        openMap("https://goo.gl/maps/hmGK1jE8WBgUU1zh8")
                      }
                    >
                      North Military Trail Boca Raton, FL 33431
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="md:self-center self-start justify-self-end text-2xl text-white bg-orange-500 px-8 py-4 rounded-md"
                href="https://www.eventbrite.com/e/the-muse-duo-experiments-2023-album-release-tour-tickets-597008086257"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tickets
              </a>
            </div>
          </li>
          <li className="bg-white lg:p-12 p-10 shadow-sm hover:shadow-md hover:translate-x-1 transition rounded-lg">
            <div className="flex md:flex-row md:gap-20 gap-10 flex-col">
              <div className="text-4xl">
                <div>7</div>
                <div>May</div>
              </div>
              <div className="flex flex-col md:gap-4 gap-8 flex-grow">
                <div className="text-5xl">Schmidt Vocal Arts Center</div>
                <div className="flex gap-6">
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-clock"></i>
                    <div className="text-xl">3:00PM EDT</div>
                  </div>
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-location-dot"></i>
                    <div
                      className="text-xl underline decoration-dotted underline-offset-2 cursor-pointer"
                      onClick={() =>
                        openMap("https://goo.gl/maps/UGYN9jSgw8yZaF6EA")
                      }
                    >
                      412 Rose St, Lexington, KY 40508 Kentucky, KY 40508
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="md:self-center self-start justify-self-end text-2xl text-white bg-orange-500 px-8 py-4 rounded-md"
                href="https://www.eventbrite.com/e/the-muse-duo-experiments-2023-album-release-tour-tickets-597129489377"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tickets
              </a>
            </div>
          </li>
          <li className="bg-white lg:p-12 p-10 shadow-sm hover:shadow-md hover:translate-x-1 transition rounded-lg">
            <div className="flex md:flex-row md:gap-20 gap-10 flex-col">
              <div className="text-4xl">
                <div>20</div>
                <div>May</div>
              </div>
              <div className="flex flex-col md:gap-4 gap-8 flex-grow">
                <div className="text-5xl">
                  Sunshine Cathedral Center for the Performing Arts
                </div>
                <div className="flex gap-6">
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-clock"></i>
                    <div className="text-xl">8:00PM EDT</div>
                  </div>
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-location-dot"></i>
                    <div
                      className="text-xl underline decoration-dotted underline-offset-2 cursor-pointer"
                      onClick={() =>
                        openMap(
                          "https://www.google.com/maps/place/Sunshine+Cathedral+MCC/@26.1033971,-80.1550231,17z/data=!3m2!4b1!5s0x88d9008d6d986b25:0xf8a9f6d227cc987b!4m6!3m5!1s0x88d9008d0d6d3729:0xc7337a9ff83af3d9!8m2!3d26.1033923!4d-80.1528344!16s%2Fg%2F113hfcjh6"
                        )
                      }
                    >
                      1480 SW 9th Ave Fort Lauderdale, FL 33315
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="md:self-center self-start justify-self-end text-2xl text-white bg-orange-500 px-8 py-4 rounded-md"
                href="https://www.eventbrite.com/e/sunshine-cathedral-center-for-the-performing-arts-presents-muse-duo-tickets-538604740277?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=cp&aff=escb"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tickets
              </a>
            </div>
          </li>
          <li className="bg-white lg:p-12 p-10 shadow-sm hover:shadow-md hover:translate-x-1 transition rounded-lg">
            <div className="flex md:flex-row md:gap-20 gap-10 flex-col">
              <div className="text-4xl">
                <div>26</div>
                <div>May</div>
              </div>
              <div className="flex flex-col md:gap-4 gap-8 flex-grow">
                <div className="text-5xl">ARTSPACE at Untitled</div>
                <div className="flex gap-6">
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-clock"></i>
                    <div className="text-xl">3:00PM CDT</div>
                  </div>
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-location-dot"></i>
                    <div
                      className="text-xl underline decoration-dotted underline-offset-2 cursor-pointer"
                      onClick={() =>
                        openMap("https://goo.gl/maps/NWUbpSpGp1WMVcF17")
                      }
                    >
                      1 NE 3rd St, Oklahoma City, OK 73104
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="md:self-center self-start justify-self-end text-2xl text-white bg-orange-500 px-8 py-4 rounded-md"
                href="https://www.eventbrite.com/e/the-muse-duo-experiments-2023-album-release-tour-tickets-597032589547"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tickets
              </a>
            </div>
          </li>
          <li className="bg-white lg:p-12 p-10 shadow-sm hover:shadow-md hover:translate-x-1 transition rounded-lg">
            <div className="flex md:flex-row md:gap-20 gap-10 flex-col">
              <div className="text-4xl">
                <div>28</div>
                <div>May</div>
              </div>
              <div className="flex flex-col md:gap-4 gap-8 flex-grow">
                <div className="text-5xl">First Presbyterian Church</div>
                <div className="flex gap-6">
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-clock"></i>
                    <div className="text-xl">3:00PM CDT</div>
                  </div>
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-location-dot"></i>
                    <div
                      className="text-xl underline decoration-dotted underline-offset-2 cursor-pointer"
                      onClick={() =>
                        openMap("https://goo.gl/maps/ahdXvYYNg1BiSjna6")
                      }
                    >
                      1001 NW 25 Street Oklahoma CIty, OK 73106
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="md:self-center self-start justify-self-end text-2xl text-white bg-orange-500 px-8 py-4 rounded-md"
                href="https://www.eventbrite.com/e/the-muse-duo-experiments-2023-album-release-tour-tickets-597247522417"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tickets
              </a>
            </div>
          </li>
          <li className="bg-white lg:p-12 p-10 shadow-sm hover:shadow-md hover:translate-x-1 transition rounded-lg">
            <div className="flex md:flex-row md:gap-20 gap-10 flex-col">
              <div className="text-4xl">
                <div>25</div>
                <div>June</div>
              </div>
              <div className="flex flex-col md:gap-4 gap-8 flex-grow">
                <div className="text-5xl">Boca Museum of Art</div>
                <div className="flex gap-6">
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-clock"></i>
                    <div className="text-xl">8:00PM EDT</div>
                  </div>
                  <div className="flex md:gap-2 gap-4 items-center">
                    <i className="fa-solid fa-location-dot"></i>
                    <div
                      className="text-xl underline decoration-dotted underline-offset-2 cursor-pointer"
                      onClick={() =>
                        openMap("https://goo.gl/maps/rehnB1psGYtQYnte6")
                      }
                    >
                      501 Plaza Real, Boca Raton, FL 33432
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="md:self-center self-start justify-self-end text-2xl text-white bg-orange-500 px-8 py-4 rounded-md"
                href="https://bocamuseum.org/visit/events"
                rel="noopener noreferrer"
                target="_blank"
              >
                Tickets
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Concerts;
