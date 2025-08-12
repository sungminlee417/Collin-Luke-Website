"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useData } from '../lib/dataContext';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data } = useData();
  const heroData = data.hero || {
    logo: '/images/landing-logo.png',
    logoAlt: 'The Muse Duo Logo',
    backgroundImage: 'https://the-muse-duo.s3.us-west-1.amazonaws.com/landing.jpeg',
    backgroundAlt: 'The Muse Duo Background',
    ctaText: 'Explore',
    showCta: true,
    logoWidth: 400,
    logoHeight: 200,
    contentAlignment: 'left',
    overlayOpacity: 'medium'
  };

  const getOverlayClasses = () => {
    switch (heroData?.overlayOpacity) {
      case 'light':
        return 'from-neutral-900/10 to-neutral-900/20'
      case 'dark':
        return 'from-neutral-900/40 to-neutral-900/60'
      default: // medium
        return 'from-neutral-900/20 to-neutral-900/40'
    }
  }

  const getContentAlignment = () => {
    return heroData?.contentAlignment === 'center' 
      ? 'items-center justify-center text-center'
      : 'items-start justify-start text-left pl-8 md:pl-16 lg:pl-24'
  }

  const scrollToAbout = () => {
    document.querySelector(".about-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroData?.backgroundImage || 'https://the-muse-duo.s3.us-west-1.amazonaws.com/landing.jpeg'}
          alt={heroData?.backgroundAlt || 'The Muse Duo Background'}
          fill
          className="object-cover object-center"
          priority
          quality={90}
          onLoadingComplete={() => setIsLoaded(true)}
        />

        {/* Gradient Overlays for Depth */}
        <div className={`absolute inset-0 bg-gradient-to-b ${getOverlayClasses()} via-transparent`} />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-neutral-900/30" />
      </div>


      {/* Main Content */}
      <div className={`relative z-10 w-full h-full flex flex-col ${getContentAlignment()}`}>
        {/* Logo and CTA container - keeps everything aligned */}
        <div className="flex flex-col items-center mt-24 md:mt-32 lg:mt-40">
          {/* Logo */}
          <div className={`relative mb-8 transition-all duration-700 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-white/90 dark:bg-white/95 blur-3xl rounded-full scale-150 -z-10" />

            <Image
              src={heroData?.logo || '/images/landing-logo.png'}
              alt={heroData?.logoAlt || 'The Muse Duo Logo'}
              width={heroData?.logoWidth || 400}
              height={heroData?.logoHeight || 200}
              className={`max-w-[90vw] md:max-w-[${heroData?.logoWidth || 400}px] max-h-[40vh] w-auto h-auto object-contain drop-shadow-2xl`}
              priority
            />
          </div>

          {/* Scroll Indicator - perfectly centered under logo */}
          {heroData?.showCta && (
            <div className={`transition-all duration-1000 delay-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <button
                onClick={scrollToAbout}
                className="flex flex-col items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-accent-500 dark:hover:text-accent-400 transition-all duration-300 hover:-translate-y-1 group"
              >
                <span className="text-xs font-medium tracking-wider uppercase group-hover:text-accent-500 dark:group-hover:text-accent-400">
                  {heroData?.ctaText || 'Explore'}
                </span>
                <svg
                  className="w-6 h-6 transform group-hover:translate-y-1 transition-transform duration-300"
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
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
