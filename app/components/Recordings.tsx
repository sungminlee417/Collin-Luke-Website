'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import ReactPlayer from 'react-player/youtube'

interface RecordingItem {
  id: number
  name: string
  url: string
}

// Fallback demo recordings when Firebase isn't available
const demoRecordings: RecordingItem[] = [
  {
    id: 1,
    name: "Sample Performance 1",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // placeholder
  },
  {
    id: 2,
    name: "Sample Performance 2", 
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // placeholder
  }
]

const Recordings: React.FC = () => {
  const [recordings, setRecordings] = useState<RecordingItem[]>(demoRecordings)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [firebaseError, setFirebaseError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = collection(db, 'video/')
        onSnapshot(docRef, (querySnapshot) => {
          const recordings = querySnapshot.docs.map((doc) => {
            const data = doc.data() as RecordingItem
            return data
          })
          console.log(`Loaded ${recordings.length} recordings from Firebase`)
          if (recordings.length > 0) {
            setRecordings(recordings)
            setFirebaseError(false)
          } else {
            console.log('No recordings found in Firebase, using demo content')
          }
        }, (error) => {
          console.error('Firebase error:', error)
          setFirebaseError(true)
        })
      } catch (error) {
        console.error('Firebase initialization error:', error)
        setFirebaseError(true)
      }
    }

    fetchData()
  }, [])

  const handlePreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? recordings.length : prevSlide - 1))
    setIsPlaying(false)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === recordings.length ? 0 : prevSlide + 1))
    setIsPlaying(false)
  }

  return (
    <section className="recordings-section bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 text-muse-red mb-4">Music</h2>
            <p className="text-gray-600 mb-8">
              Take a listen to some of our live performances and recordings!
            </p>

            <div className="space-y-6">
              <motion.div
                className="card-modern p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src="/images/IMG_6718.jpg"
                      alt="Experiments Album"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-normal text-gray-900">Experiments</h3>
                    <p className="text-sm text-gray-600">Debut Album</p>
                    <p className="text-xs text-gray-500 mt-1">2022</p>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p className="mb-2">Featured tracks from our debut album:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• "Opening Movements" - 4:32</li>
                    <li>• "Interlude in G Minor" - 3:15</li>
                    <li>• "Experiments Suite" - 6:48</li>
                    <li>• "Closing Reflections" - 5:22</li>
                  </ul>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={handlePreviousSlide}
                    className="flex-1 btn-secondary flex items-center justify-center gap-2"
                    aria-label="Previous recording"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                    aria-label="Next recording"
                  >
                    Next
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Available on:</p>
                  <div className="flex gap-3">
                    <span className="text-xs text-gray-600 px-2 py-1 bg-gray-100 rounded">Spotify</span>
                    <span className="text-xs text-gray-600 px-2 py-1 bg-gray-100 rounded">Apple Music</span>
                    <span className="text-xs text-gray-600 px-2 py-1 bg-gray-100 rounded">YouTube</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {currentSlide === 0 ? (
                <motion.div
                  key="album"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/images/IMG_6718.jpg"
                    alt="Experiments Album Cover"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-3xl font-normal mb-2">Experiments</h3>
                    <p className="text-lg opacity-90">The Muse Duo's Debut Album</p>
                  </div>
                </motion.div>
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
                    <h3 className="text-xl font-normal text-gray-900">
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
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <h3 className="text-lg font-normal text-gray-700 mb-2">Video Recordings</h3>
                    <p className="text-gray-500 text-sm mb-4">
                      Live performance recordings and studio sessions coming soon
                    </p>
                    <p className="text-xs text-gray-400">
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
                    setCurrentSlide(index)
                    setIsPlaying(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'w-8 bg-muse-red'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Recordings