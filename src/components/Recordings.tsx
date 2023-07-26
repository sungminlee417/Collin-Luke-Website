import React from "react";
import ReactPlayer from "react-player";
import { useRef } from "react";
import album from "../images/IMG_6718.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
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
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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
                ref={prevRef}
                className="prev-button rounded-full border border-[#660000] p-3 text-[#660000] hover:bg-[#660000] hover:text-white"
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
                ref={nextRef}
                className="next-button rounded-full border border-[#660000] p-3 text-[#660000] hover:bg-[#660000] hover:text-white"
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

          <div className="-mx-6 lg:col-span-2 lg:mx-0">
            <div className="swiper-container !overflow-hidden">
              <Swiper
                className="swiper-wrapper"
                loop={true}
                spaceBetween={10}
                navigation={{
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }}
                pagination={{
                  clickable: true,
                }}
              >
                {recordingsURL.map((recording) => {
                  return (
                    <SwiperSlide>
                      <div className="flex h-144 flex-col justify-center bg-white p-12 my-4 gap-4">
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
                  <div className="flex h-144 justify-center bg-white p-12 my-4 gap-8 items-center">
                    <img
                      src={album}
                      alt="album cover"
                      className="shadow-lg md:w-7/12"
                    />
                    <a
                      href="https://open.spotify.com/album/06Q4h44XDIYrpE0EbGAFMy"
                      className="block w-full rounded bg-[#660000] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#880000] focus:outline-none focus:ring active:bg-[#990000] sm:w-auto"
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
