"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";
import type { HeroData } from "../../sanity/lib/types";

interface HeroProps {
  data: HeroData | null;
}

const Hero = ({ data }: HeroProps) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    if (logoLoaded && imageLoaded && !showBackground) {
      const timer = setTimeout(() => setShowBackground(true), 800);
      return () => clearTimeout(timer);
    }
  }, [logoLoaded, imageLoaded, showBackground]);

  // Scroll parallax + mouse-tracked content shift, coalesced into one rAF.
  useEffect(() => {
    let raf = 0;
    let scrollY = 0;
    let mouseX = 0;

    const apply = () => {
      raf = 0;
      const bgOffset = Math.max(-100, -scrollY / 10);
      if (bgRef.current) {
        bgRef.current.style.transform = `translate3d(0, ${bgOffset}px, 0)`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(${mouseX * 5}px, 0, 0)`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onScroll = () => {
      scrollY = window.scrollY;
      schedule();
    };
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      schedule();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      if (raf) cancelAnimationFrame(raf);
    };
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
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[100px] -bottom-[100px] z-0 will-change-transform"
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
              showBackground ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            priority
            quality={90}
            sizes="100vw"
            onLoad={() => setImageLoaded(true)}
          />
        )}

        <div
          className={`absolute inset-0 bg-gradient-to-b from-neutral-900/20 via-transparent to-neutral-900/40 transition-opacity duration-1000 ${
            showBackground ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        />
        <div
          className={`absolute inset-0 bg-gradient-radial from-transparent via-transparent to-neutral-900/30 transition-opacity duration-1000 ${
            showBackground ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "700ms" }}
        />
        <div
          className={`absolute inset-0 mix-blend-multiply transition-opacity duration-1000 ${
            showBackground ? "opacity-20" : "opacity-0"
          }`}
          style={{ transitionDelay: "1000ms" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/10 via-transparent to-accent-900/10" />
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-neutral-900" />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left px-6 max-w-6xl mx-auto md:ml-16 lg:ml-24 will-change-transform"
      >
        <div
          className={`relative mb-12 transition-all duration-[1200ms] ease-out ${
            logoLoaded ? "opacity-100 scale-100 rotate-y-0" : "opacity-0 scale-90"
          }`}
          style={{ transitionDelay: "300ms" }}
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
        </div>
      </div>

      {data?.showCta !== false && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-[fadeIn_800ms_ease-out_3s_forwards]"
        >
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-2 text-neutral-600 dark:text-neutral-400
                       hover:text-accent-500 dark:hover:text-accent-400 hover:-translate-y-1
                       transition-all duration-300"
          >
            <span className="text-xs font-medium tracking-wider uppercase">
              {ctaText}
            </span>
            <svg
              className="w-6 h-6 animate-[bounceY_2s_ease-in-out_infinite]"
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
    </section>
  );
};

export default Hero;
