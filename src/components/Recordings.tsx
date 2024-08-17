import React, { useState, useEffect } from "react";
import album from "../images/IMG_6718.jpg";
import Recording from "./Recording";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "..";

interface RecordingItem {
  id: number;
  name: string;
  url: string;
}

const Recordings: React.FC = () => {
  const [recordings, setRecordings] = useState<RecordingItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? recordings.length : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === recordings.length ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      const docRef = collection(db, "video/");
      onSnapshot(docRef, (querySnapshot) => {
        const recordings = querySnapshot.docs.map((doc) => {
          const data = doc.data() as RecordingItem;
          return data;
        });
        setRecordings(recordings);
      });
    };

    fetchData();
  }, []);

  return (
    <section className="recordings-section bg-gray-100 px-8">
      <div className="mx-auto max-w-[1340px] px-4 py-16 sm:px-6 sm:py-24 lg:px-0 lg:py-8">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-3 lg:items-center lg:gap-x-16">
          <div className="max-w-xl text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl">Music</h2>

            <p className="mt-4 text-gray-500">
              Take a listen to some of our live performances and recordings!
            </p>

            <div className="hidden lg:mt-8 lg:flex lg:gap-4">
              <button
                className="rounded-full border border-[#EE2E31] p-3 text-[#EE2E31] hover:bg-[#EE2E31] hover:text-white"
                onClick={handlePreviousSlide}
              >
                <span className="sr-only">Previous Slide</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button
                className="rounded-full border border-[#EE2E31] p-3 text-[#EE2E31] hover:bg-[#EE2E31] hover:text-white"
                onClick={handleNextSlide}
              >
                <span className="sr-only">Next Slide</span>
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

          <div className="lg:col-span-2 lg:mx-0 sm:h-160 h-144">
            <div className="relative">
              {currentSlide === 0 && (
                <div className="transition duration-200 flex flex-col md:flex-row sm:h-144 h-128 justify-center bg-white sm:p-8 p-12 my-4 gap-8 items-center absolute w-full">
                  <img
                    src={album}
                    alt="album cover"
                    className="shadow-lg sm:w-7/12 w-11/12"
                  />
                  <a
                    href="https://open.spotify.com/album/06Q4h44XDIYrpE0EbGAFMy"
                    className="block w-full rounded sm:px-12 py-3 text-sm font-medium bg-[#EE2E31] hover:bg-[#FF6B6E] shadow focus:outline-none focus:ring text-white sm:w-auto text-center"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Listen on Spotify
                  </a>
                </div>
              )}
              {recordings.map((recording, i) => (
                <>
                  {currentSlide === i + 1 && (
                    <div key={recording.id}>
                      <Recording recording={recording} />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4 lg:hidden">
          <button
            aria-label="Previous slide"
            className="prev-button rounded-full border border-[#EE2E31] p-3 text-[#EE2E31] hover:bg-[#EE2E31] hover:text-white"
            onClick={handlePreviousSlide}
          >
            <svg
              className="h-5 w-5 transform rotate-180"
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
            className="next-button rounded-full border border-[#EE2E31] p-3 text-[#EE2E31] hover:bg-[#EE2E31] hover:text-white"
            onClick={handleNextSlide}
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
