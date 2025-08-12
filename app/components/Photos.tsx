"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { InstagramEmbed } from "react-social-media-embed";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
  order: number;
  slug: string;
}

interface GalleryData {
  title: string;
  subtitle?: string;
  images: GalleryImage[];
  instagramUrl?: string;
  instagramHandle?: string;
}

const Photos = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch('/api/gallery');
        const data = await response.json();
        setGalleryData(data);
      } catch (error) {
        console.error('Error loading gallery data:', error);
        // Fallback data
        setGalleryData({
          title: 'Gallery',
          subtitle: 'Capturing moments from our performances and behind the scenes',
          instagramUrl: 'https://www.instagram.com/muse__duo/',
          instagramHandle: '@muse__duo',
          images: [
            {
              url: "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-1.jpeg",
              alt: "Gallery image 1",
              order: 1,
              slug: "gallery-1"
            },
            {
              url: "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-7.jpeg",
              alt: "Gallery image 7",
              order: 2,
              slug: "gallery-7"
            },
            {
              url: "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-8.jpeg",
              alt: "Gallery image 8",
              order: 3,
              slug: "gallery-8"
            },
            {
              url: "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-11.jpeg",
              alt: "Gallery image 11",
              order: 4,
              slug: "gallery-11"
            },
            {
              url: "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-14.jpg",
              alt: "Gallery image 14",
              order: 5,
              slug: "gallery-14"
            },
            {
              url: "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-15.jpg",
              alt: "Gallery image 15",
              order: 6,
              slug: "gallery-15"
            }
          ]
        });
      }
    };

    fetchGalleryData();
  }, []);

  return (
    <>
      <section className="photos-section bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container-custom section-padding px-2 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-2 text-muse-red dark:text-red-400 mb-4">
              {galleryData?.title || 'Gallery'}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              {galleryData?.subtitle || 'Capturing moments from our performances and behind the scenes'}
            </p>
          </motion.div>

          {/* Gallery Carousel - Full Width */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
                className="gallery-swiper rounded-2xl overflow-hidden"
                style={{
                  "--swiper-navigation-color": "#EE2E31",
                  "--swiper-pagination-color": "#EE2E31",
                } as React.CSSProperties}
              >
                {(galleryData?.images || []).map((image, index) => (
                  <SwiperSlide key={image.slug || index}>
                    <motion.div
                      className="relative aspect-[4/3] cursor-pointer group overflow-hidden rounded-xl"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => setSelectedImage(image.url)}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3">
                          <svg
                            className="w-6 h-6 text-gray-800 dark:text-gray-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>

          {/* Instagram Section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Instagram Embed */}
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-3xl p-6 md:p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-normal text-gray-900 dark:text-gray-100 mb-2">
                  Follow Our Journey
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Behind-the-scenes moments and performance highlights
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <InstagramEmbed 
                    url="https://www.instagram.com/muse__duo/" 
                    width="100%"
                  />
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-3xl p-6 md:p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-normal text-gray-900 dark:text-gray-100 mb-2">
                  Connect With Us
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Listen to our music and stay updated
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.a
                  href={galleryData?.instagramUrl || "https://www.instagram.com/muse__duo/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">Instagram</span>
                </motion.a>

                <motion.a
                  href="https://www.youtube.com/@themuseduo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">YouTube</span>
                </motion.a>

                <motion.a
                  href="https://open.spotify.com/artist/themuseduo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.6 0-.359.24-.66.54-.78 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.18 10.561 18.72 12.84c.361.181.48.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">Spotify</span>
                </motion.a>

                <motion.a
                  href="mailto:themuseduo@gmail.com"
                  className="group flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">Email</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-5xl w-full aspect-[4/3]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged gallery image"
                fill
                className="object-contain"
                sizes="100vw"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-2
                         hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300"
                aria-label="Close image"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Photos;
