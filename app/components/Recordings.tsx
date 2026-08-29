"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Recording } from "../../sanity/lib/types";
import { useInView } from "../lib/useInView";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="w-12 h-12 rounded-full border-2 border-white/30 border-t-white animate-spin" />
    </div>
  ),
});

interface RecordingsProps {
  recordings: Recording[];
}

const Recordings: React.FC<RecordingsProps> = ({ recordings }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const left = useInView<HTMLDivElement>();
  const right = useInView<HTMLDivElement>();

  const handlePreviousSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? recordings.length : prev - 1));
    setIsPlaying(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === recordings.length ? 0 : prev + 1));
    setIsPlaying(false);
  };

  const current = currentSlide === 0 ? null : recordings[currentSlide - 1];

  return (
    <section className="recordings-section section section-white">
      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center min-w-0">
          <div
            ref={left.ref}
            className={`lg:col-span-1 transition-all duration-700 ease-out ${
              left.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="heading-2 text-muse-red dark:text-red-400 mb-8">Music</h2>

            <div className="space-y-6">
              <a
                href="https://open.spotify.com/album/06Q4h44XDIYrpE0EbGAFMy"
                target="_blank"
                rel="noopener noreferrer"
                className="card-modern p-6 block cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 min-w-0">
                  <div className="relative w-20 h-20 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src="/images/IMG_6718.jpg"
                      alt="Experiments Album"
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h3 className="font-normal text-neutral-900 dark:text-neutral-100 truncate">
                      Experiments
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 truncate">
                      Debut Album
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">2023</p>
                  </div>
                </div>
              </a>

              <div className="space-y-4">
                <div className="text-sm text-neutral-600 dark:text-neutral-300">
                  <p className="mb-2">Featured tracks from our debut album:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• &ldquo;a sense of loss&rdquo; - 4:31</li>
                    <li>• &ldquo;Guitar Sonata, Movement I&rdquo; - 3:37</li>
                    <li>• &ldquo;Point and Counter&rdquo; - 2:55</li>
                    <li>• &ldquo;crUde prelUdes, 1&rdquo; - 10:20</li>
                    <li>• &ldquo;Cereusle&rdquo; - 9:28</li>
                  </ul>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                    15 tracks • 51 minutes total
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handlePreviousSlide}
                    className="flex-1 btn-secondary flex items-center justify-center gap-2 min-w-0"
                    aria-label="Previous recording"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className="truncate">Previous</span>
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 min-w-0"
                    aria-label="Next recording"
                  >
                    <span className="truncate">Next</span>
                    <svg
                      className="w-5 h-5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                    Available on:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://open.spotify.com/album/06Q4h44XDIYrpE0EbGAFMy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-600 dark:text-neutral-300 px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded hover:bg-green-500 hover:text-white transition-colors"
                    >
                      Spotify
                    </a>
                    <a
                      href="https://music.apple.com/us/album/experiments/1679950066"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-neutral-600 dark:text-neutral-300 px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded hover:bg-neutral-800 hover:text-white transition-colors"
                    >
                      Apple Music
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={right.ref}
            className={`lg:col-span-2 min-w-0 transition-all duration-700 ease-out ${
              right.inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div key={currentSlide} className="animate-[fadeIn_300ms_ease-out]">
              {currentSlide === 0 ? (
                <a
                  href="https://open.spotify.com/album/06Q4h44XDIYrpE0EbGAFMy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl w-full max-w-full mx-auto block cursor-pointer group"
                >
                  <Image
                    src="/images/IMG_6718.jpg"
                    alt="Experiments Album Cover"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-normal mb-2">Experiments</h3>
                    <p className="text-lg opacity-90">The Muse Duo&apos;s Debut Album</p>
                    <p className="text-sm opacity-75 mt-1">Released April 2023</p>
                    <p className="text-sm opacity-75 mt-2">Click to listen on Spotify</p>
                  </div>
                </a>
              ) : current ? (
                <div>
                  <div className="rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
                    <ReactPlayer
                      url={current.url}
                      width="100%"
                      height="100%"
                      playing={isPlaying}
                      controls
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-normal text-neutral-900 dark:text-neutral-100">
                      {current.title}
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <svg
                      className="w-16 h-16 mx-auto text-neutral-400 dark:text-neutral-500 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                      />
                    </svg>
                    <h3 className="text-lg font-normal text-neutral-700 dark:text-neutral-300 mb-2">
                      Video Recordings
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4">
                      Live performance recordings and studio sessions coming soon
                    </p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500">
                      Check our social media for the latest video content
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {[...Array(recordings.length + 1)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsPlaying(false);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-8 bg-muse-red"
                      : "w-2 bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recordings;
