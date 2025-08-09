"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import ReactPlayer from "react-player/youtube";

interface RecordingItem {
  id: number;
  name: string;
  url: string;
}

// Fallback demo recordings when Firebase isn't available
const demoRecordings: RecordingItem[] = [
  {
    id: 1,
    name: "Sample Performance 1",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // placeholder
  },
  {
    id: 2,
    name: "Sample Performance 2",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // placeholder
  },
];

const Recordings: React.FC = () => {
  const [recordings, setRecordings] = useState<RecordingItem[]>(demoRecordings);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [firebaseError, setFirebaseError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = collection(db, "video/");
        onSnapshot(
          docRef,
          (querySnapshot) => {
            const recordings = querySnapshot.docs.map((doc) => {
              const data = doc.data() as RecordingItem;
              return data;
            });
            console.log(`Loaded ${recordings.length} recordings from Firebase`);
            if (recordings.length > 0) {
              setRecordings(recordings);
              setFirebaseError(false);
            } else {
              console.log(
                "No recordings found in Firebase, using demo content"
              );
            }
          },
          (error) => {
            console.error("Firebase error:", error);
            setFirebaseError(true);
          }
        );
      } catch (error) {
        console.error("Firebase initialization error:", error);
        setFirebaseError(true);
      }
    };

    fetchData();
  }, []);

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? recordings.length : prevSlide - 1
    );
    setIsPlaying(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === recordings.length ? 0 : prevSlide + 1
    );
    setIsPlaying(false);
  };

  return (
    <section className="recordings-section bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom section-padding px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center min-w-0">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 text-muse-red dark:text-red-400 mb-4">
              Music
            </h2>
            <p className="text-gray-600 mb-8">
              Take a listen to some of our live performances and recordings!
            </p>

            <div className="space-y-6">
              <motion.a
                href="https://open.spotify.com/album/06Q4h44XDIYrpE0EbGAFMy"
                target="_blank"
                rel="noopener noreferrer"
                className="card-modern p-6 block cursor-pointer hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 min-w-0">
                  <div className="relative w-20 h-20 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src="/images/IMG_6718.jpg"
                      alt="Experiments Album"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h3 className="font-normal text-gray-900 dark:text-gray-100 truncate">
                      Experiments
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      Debut Album
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2023</p>
                  </div>
                </div>
              </motion.a>

              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p className="mb-2">Featured tracks from our debut album:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• "a sense of loss" - 4:31</li>
                    <li>• "Guitar Sonata, Movement I" - 3:37</li>
                    <li>• "Point and Counter" - 2:55</li>
                    <li>• "crUde prelUdes, 1" - 10:20</li>
                    <li>• "Cereusle" - 9:28</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">
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

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Available on:</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://open.spotify.com/album/06Q4h44XDIYrpE0EbGAFMy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-600 px-2 py-1 bg-gray-100 rounded hover:bg-green-500 hover:text-white transition-colors"
                    >
                      Spotify
                    </a>
                    <a
                      href="https://music.apple.com/us/album/experiments/1679950066"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-600 px-2 py-1 bg-gray-100 rounded hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      Apple Music
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 min-w-0"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {currentSlide === 0 ? (
                <motion.a
                  key="album"
                  href="https://open.spotify.com/album/06Q4h44XDIYrpE0EbGAFMy"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
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
                    <p className="text-lg opacity-90">
                      The Muse Duo's Debut Album
                    </p>
                    <p className="text-sm opacity-75 mt-1">
                      Released April 2023
                    </p>
                    <p className="text-sm opacity-75 mt-2">
                      Click to listen on Spotify
                    </p>
                  </div>
                </motion.a>
              ) : recordings[currentSlide - 1] ? (
                <motion.div
                  key={recordings[currentSlide - 1].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
                    <ReactPlayer
                      url={recordings[currentSlide - 1].url}
                      width="100%"
                      height="100%"
                      playing={isPlaying}
                      controls
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      className="react-player"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-normal text-gray-900 dark:text-gray-100">
                      {recordings[currentSlide - 1].name}
                    </h3>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center"
                >
                  <div className="text-center p-8">
                    <svg
                      className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500 mb-4"
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
                    <h3 className="text-lg font-normal text-gray-700 dark:text-gray-300 mb-2">
                      Video Recordings
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                      Live performance recordings and studio sessions coming
                      soon
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Check our social media for the latest video content
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 flex justify-center gap-2">
              {[...Array(recordings.length + 1)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsPlaying(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "w-8 bg-muse-red"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Recordings;
