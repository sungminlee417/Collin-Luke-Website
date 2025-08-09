'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://the-muse-duo.s3.us-west-1.amazonaws.com/landing.jpeg"
          alt="The Muse Duo Background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/40 dark:from-black/60 dark:via-black/50 dark:to-black/70 backdrop-blur-[1px]" />
      </div>

      <motion.div 
        className="relative z-10 text-center px-4 will-change-transform"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        onAnimationComplete={() => {
          // Remove will-change after animation completes for better performance
          const element = document.querySelector('.will-change-transform');
          if (element) element.classList.remove('will-change-transform');
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-white/80 dark:bg-white/95 blur-3xl rounded-full -z-10 scale-150" />
          <Image
            src="/images/landing-logo.png"
            alt="The Muse Duo Logo"
            width={400}
            height={200}
            className="max-w-[90vw] max-h-[40vh] w-auto h-auto object-contain mx-auto drop-shadow-2xl"
            priority
          />
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 blur-xl rounded-full scale-150" />
            <p className="relative text-gray-800 dark:text-white text-lg md:text-xl font-medium tracking-wider uppercase 
                         bg-white/60 dark:bg-gray-800/70 backdrop-blur-sm px-6 py-2 rounded-full 
                         border border-white/40 dark:border-gray-600/40 shadow-lg">
              Classical Music Ensemble
            </p>
          </div>
          <motion.button
            onClick={() => {
              document.querySelector('.about-section')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
            className="mt-4 p-3 rounded-full border-2 border-muse-red/50 text-muse-red 
                     hover:bg-muse-red hover:text-white transition-all duration-300 
                     hover:scale-110 active:scale-95"
            whileHover={{ y: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll down"
          >
            <svg
              className="w-6 h-6 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero