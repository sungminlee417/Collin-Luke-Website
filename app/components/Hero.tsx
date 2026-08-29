"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { urlForImage } from "../../sanity/lib/image";
import type { HeroData } from "../../sanity/lib/types";

interface HeroProps {
  data: HeroData | null;
}

const Hero = ({ data }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);

  useEffect(() => {
    if (logoLoaded && imageLoaded && !showBackground) {
      const timer = setTimeout(() => {
        setShowBackground(true);
        setIsLoaded(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [logoLoaded, imageLoaded, showBackground]);

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

  const backgroundUrl = data?.backgroundImage
    ? urlForImage(data.backgroundImage).width(2400).quality(85).url()
    : null;
  const logoUrl = data?.logo
    ? urlForImage(data.logo).width(800).url()
    : "/images/landing-logo.png";
  const logoWidth = data?.logoWidth ?? 400;
  const logoHeight = data?.logoHeight ?? 200;
  const ctaText = data?.ctaText ?? "Explore";

  return (
    <section
      ref={containerRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 -top-[100px] -bottom-[100px] z-0"
        style={{ y: y1 }}
      >
        {!showBackground && (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
          </div>
        )}

        {backgroundUrl && (
          <Image
            src={backgroundUrl}
            alt={data?.backgroundAlt ?? "The Muse Duo Background"}
            fill
            className={`object-cover object-center transition-all duration-[1500ms] ease-out ${
              showBackground
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
            priority
            quality={90}
            sizes="100vw"
            onLoad={() => setImageLoaded(true)}
          />
        )}

        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-neutral-900/20 via-transparent to-neutral-900/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: showBackground ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-neutral-900/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: showBackground ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <motion.div
          className="absolute inset-0 opacity-20 mix-blend-multiply"
          initial={{ opacity: 0 }}
          animate={{ opacity: showBackground ? 0.2 : 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/10 via-transparent to-accent-900/10" />
        </motion.div>
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-neutral-900"></div>

      <motion.div
        className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left px-6 max-w-6xl mx-auto md:ml-16 lg:ml-24"
        style={{ x: mousePosition.x * 5 }}
      >
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
          animate={{
            scale: logoLoaded ? 1 : 0.8,
            opacity: logoLoaded ? 1 : 0,
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
          <div className="absolute inset-0 bg-white/90 dark:bg-white/95 blur-3xl rounded-full scale-150 -z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-accent-500/20 to-primary-500/20 blur-2xl rounded-full scale-125 -z-10 animate-glow" />

          <Image
            src={logoUrl}
            alt={data?.logoAlt ?? "The Muse Duo Logo"}
            width={logoWidth}
            height={logoHeight}
            className="max-w-[90vw] md:max-w-[400px] max-h-[40vh] w-auto h-auto object-contain drop-shadow-2xl"
            priority
            onLoad={() => setLogoLoaded(true)}
          />
        </motion.div>
      </motion.div>

      {data?.showCta !== false && (
        <motion.div
          className="absolute bottom-8 left-1/2 z-10"
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <motion.button
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-accent-500 dark:hover:text-accent-400 transition-colors duration-300"
            whileHover={{ y: -5 }}
          >
            <span className="text-xs font-medium tracking-wider uppercase">
              {ctaText}
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
      )}
    </section>
  );
};

export default Hero;
