import React, { useRef } from "react";
import ReactPlayer from "react-player";
import album from "../images/IMG_6718.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const recordingOne = {
  id: 1,
  name: "Cereusle",
  url: "https://youtu.be/m_oA5_T2_UE",
};

const recordingTwo = {
  id: 2,
  name: "A Sense of Loss",
  url: "https://youtu.be/DuvWZ6DD7zc",
};

const recordingsURL = [recordingOne, recordingTwo];

const Recordings = () => {
  const swiper = useRef<SwiperType | null>(null);

  const handleSwiperInit = (swiperInstance: SwiperType) => {
    swiper.current = swiperInstance;
  };

  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-[1340px] px-4 py-16 sm:px-6 sm:py-24 lg:pe-0 lg:ps-8">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:items-center lg:gap-x-16">
          <div className="max-w-xl text-center sm:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Recordings
            </h2>

            <p className="mt-4 text-gray-500">
              Take a listen to some of our live performances and recordings!
            </p>

            <div className="hidden lg:mt-8 lg:flex lg:gap-4">
              <button
                className="rounded-full border border-[#660000] p-3 text-[#660000] hover:bg-[#660000] hover:text-white"
                onClick={() => swiper.current?.slidePrev()}
              >
                <span className="sr-only">Previous Slide</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 rtl:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button
                className="rounded-full border border-[#660000] p-3 text-[#660000] hover:bg-[#660000] hover:text-white"
                onClick={() => swiper.current?.slideNext()}
              >
                <span className="sr-only">Next Slide</span>
                <svg
                  className="h-5 w-5 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 lg:mx-0">
            <div>
              <Swiper
                loop={true}
                slidesPerView={1}
                onInit={handleSwiperInit} // If you want to do additional setup during initialization
              >
                {recordingsURL.map((recording) => {
                  return (
                    <SwiperSlide>
                      <div className="flex h-144 flex-col justify-center bg-white sm:p-12 p-4 my-4 gap-4">
                        <p className="text-2xl font-bold text-[#660000] sm:text-3xl">
                          {recording.name}
                        </p>
                        <div className="h-fit">
                          <ReactPlayer
                            url={recording.url}
                            controls
                            width="100%"
                            height="100%"
                            className="aspect-video"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
                <SwiperSlide>
                  <div className="flex flex-col md:flex-row h-144 justify-center bg-white sm:p-8 p-12 my-4 gap-8 items-center">
                    <img
                      src={album}
                      alt="album cover"
                      className="shadow-lg sm:w-7/12 w-11/12"
                    />
                    <a
                      href="https://open.spotify.com/album/06Q4h44XDIYrpE0EbGAFMy"
                      className="block w-full rounded px-12 py-3 text-sm font-medium bg-[#660000] hover:bg-[#880000] shadow focus:outline-none focus:ring text-white sm:w-auto text-center"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Listen on Spotify
                    </a>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4 lg:hidden">
          <button
            aria-label="Previous slide"
            className="prev-button rounded-full border border-[#660000] p-3 text-[#660000] hover:bg-[#660000] hover:text-white"
            onClick={() => swiper.current?.slidePrev()}
          >
            <svg
              className="h-5 w-5 -rotate-180 transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>

          <button
            aria-label="Next slide"
            className="next-button rounded-full border border-[#660000] p-3 text-[#660000] hover:bg-[#660000] hover:text-white"
            onClick={() => swiper.current?.slideNext()}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Recordings;
