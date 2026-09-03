"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { urlForImage, sanityLoader } from "../../sanity/lib/image";
import type { HeroData } from "../../sanity/lib/types";

interface HeroProps {
  data: HeroData | null;
}

const Hero = ({ data }: HeroProps) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Subtle parallax — the image is the star, so we move it just a touch.
  useEffect(() => {
    let raf = 0;
    let scrollY = 0;
    const apply = () => {
      raf = 0;
      if (bgRef.current) {
        const offset = Math.max(-80, -scrollY / 8);
        bgRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToNext = () => {
    document.querySelector(".about-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const backgroundUrl = data?.backgroundImage
    ? urlForImage(data.backgroundImage).url()
    : null;
  const logoUrl = data?.logo ? urlForImage(data.logo).url() : null;

  return (
    <section className="hero-section relative min-h-[100svh] overflow-hidden bg-neutral-950 text-neutral-50">
      {/* Image — full bleed, close to full opacity so the photo carries the section. */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-[80px] -bottom-[80px] z-0 will-change-transform"
      >
        {backgroundUrl && (
          <Image
            src={backgroundUrl}
            alt={data?.backgroundAlt ?? "The Muse Duo"}
            fill
            loader={sanityLoader}
            className={`object-cover object-center transition-opacity duration-[1500ms] ease-out ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            priority
            quality={82}
            sizes="100vw"
            onLoad={() => setImageLoaded(true)}
          />
        )}
        {/* Minimal wash — just enough for text legibility at top and bottom.
            Middle of the image stays untouched so the subject is visible. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-neutral-950/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-neutral-950/80 to-transparent" />
      </div>

      {/* Bottom-left signature: the logo image, sized to breathe against the photo */}
      <div className="relative z-10 min-h-[100svh] flex flex-col justify-end pb-16 md:pb-20 px-6 md:px-12 lg:px-16">
        {logoUrl ? (
          <div className="opacity-0 animate-[fadeIn_1200ms_ease-out_200ms_forwards]">
            <h1 className="sr-only">The Muse Duo</h1>
            <Image
              src={logoUrl}
              alt={data?.logoAlt ?? "The Muse Duo"}
              width={480}
              height={240}
              loader={sanityLoader}
              quality={90}
              priority
              sizes="(max-width: 640px) 240px, (max-width: 768px) 320px, 420px"
              className="w-auto h-auto max-w-[240px] sm:max-w-[320px] md:max-w-[420px] max-h-[30vh] object-contain drop-shadow-2xl"
            />
          </div>
        ) : (
          <h1 className="font-display font-light tracking-[-0.02em] leading-[0.9] text-5xl sm:text-6xl md:text-7xl text-neutral-50 opacity-0 animate-[fadeIn_1200ms_ease-out_200ms_forwards]">
            The Muse Duo
          </h1>
        )}
      </div>

      {/* Scroll cue */}
      {data?.showCta !== false && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-[fadeIn_800ms_ease-out_1800ms_forwards]">
          <button
            onClick={scrollToNext}
            className="group flex flex-col items-center gap-3 text-neutral-400 hover:text-neutral-50 transition-colors duration-300"
            title="Scroll to content"
          >
            <span className="text-[9px] tracking-[0.35em] uppercase">
              {data?.ctaText ?? "Continue"}
            </span>
            <span className="w-px h-8 bg-neutral-500 group-hover:bg-neutral-50 transition-colors duration-300" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Hero;
