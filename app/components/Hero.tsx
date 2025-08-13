"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 800], [0, -200]);
  const y2 = useTransform(scrollY, [0, 800], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse tracking for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    document.querySelector(".about-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={containerRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Layer with Parallax */}
      <motion.div className="absolute inset-0 -top-32 -bottom-32 z-0" style={{ y: y1 }}>
        <Image
          src="https://the-muse-duo.s3.us-west-1.amazonaws.com/landing.jpeg"
          alt="The Muse Duo Background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          onLoadingComplete={() => setIsLoaded(true)}
        />

        {/* Gradient Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/20 via-transparent to-neutral-900/40" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-neutral-900/30" />

        {/* Animated grain texture overlay */}
        <div className="absolute inset-0 opacity-20 mix-blend-multiply">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/10 via-transparent to-accent-900/10 animate-shimmer" />
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-500/30 rounded-full"
        style={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/3 w-1 h-1 bg-accent-400/40 rounded-full"
        style={{
          x: mousePosition.x * -20,
          y: mousePosition.y * -20,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left px-6 max-w-6xl mx-auto md:ml-16 lg:ml-24"
        style={{
          opacity,
          y: y2,
          x: mousePosition.x * 10,
        }}
      >
        {/* Logo with Advanced Animation */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
          animate={{
            scale: isLoaded ? 1 : 0.8,
            opacity: isLoaded ? 1 : 0,
            rotateY: 0,
          }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-white/90 dark:bg-white/95 blur-3xl rounded-full scale-150 -z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-primary-500/20 blur-2xl rounded-full scale-125 -z-10 animate-glow" />

          <Image
            src="/images/landing-logo.png"
            alt="The Muse Duo Logo"
            width={400}
            height={200}
            className="max-w-[90vw] md:max-w-[400px] max-h-[40vh] w-auto h-auto object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <motion.button
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors duration-300"
            whileHover={{ y: -5 }}
          >
            <span className="text-xs font-medium tracking-wider uppercase">
              Explore
            </span>
            <motion.svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </motion.svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
