"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";
import type { GalleryImage } from "../../sanity/lib/types";
import { useInView } from "../lib/useInView";

interface PhotosProps {
  images: GalleryImage[];
  instagramUrl?: string;
}

const BEHOLD_FEED_ID = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;

function handleFromUrl(url: string) {
  try {
    const path = new URL(url).pathname.replace(/^\/|\/$/g, "");
    return path ? `@${path}` : null;
  } catch {
    return null;
  }
}

const Photos = ({ images, instagramUrl }: PhotosProps) => {
  const instagramHandle = instagramUrl ? handleFromUrl(instagramUrl) : null;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const header = useInView<HTMLDivElement>();
  const carousel = useInView<HTMLDivElement>();
  const feedSection = useInView<HTMLDivElement>({ rootMargin: "200px" });

  // Lazy-load Behold widget script the first time the feed section approaches view.
  useEffect(() => {
    if (!BEHOLD_FEED_ID || !feedSection.inView) return;
    const SRC = "https://w.behold.so/widget.js";
    if (document.querySelector(`script[src="${SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SRC;
    s.type = "module";
    s.async = true;
    document.head.appendChild(s);
  }, [feedSection.inView]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("li");
    const step = item ? item.getBoundingClientRect().width + 20 : el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [images.length]);

  useEffect(() => {
    if (!selectedImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
        setModalImageLoaded(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedImage]);

  const galleryImages = images.map((img) => ({
    id: img._id,
    url: urlForImage(img.image).width(1200).quality(80).url(),
    fullUrl: urlForImage(img.image).width(2400).quality(90).url(),
    alt: img.alt,
    caption: img.caption,
  }));

  return (
    <>
      <section className="photos-section section section-tint">
        <div className="section-inner">
          <div
            ref={header.ref}
            className={`text-center mb-12 transition-all duration-700 ease-out ${
              header.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <h2 className="heading-2 text-muse-red dark:text-red-400 mb-8">Gallery</h2>
          </div>

          <div
            ref={carousel.ref}
            className={`mb-16 relative transition-all duration-700 ease-out ${
              carousel.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              className="flex absolute left-0 top-1/2 -translate-y-1/2 z-10
                         items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full
                         bg-white/95 dark:bg-neutral-900/95 shadow-lg border border-neutral-200/60 dark:border-neutral-700/60
                         text-neutral-800 dark:text-neutral-100
                         hover:scale-105 active:scale-95 transition
                         disabled:opacity-0 disabled:pointer-events-none"
              aria-label="Previous images"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              className="flex absolute right-0 top-1/2 -translate-y-1/2 z-10
                         items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full
                         bg-white/95 dark:bg-neutral-900/95 shadow-lg border border-neutral-200/60 dark:border-neutral-700/60
                         text-neutral-800 dark:text-neutral-100
                         hover:scale-105 active:scale-95 transition
                         disabled:opacity-0 disabled:pointer-events-none"
              aria-label="Next images"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <ul
              ref={scrollerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4
                         [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {galleryImages.map((image, index) => (
                <li
                  key={image.id || index}
                  className="snap-start shrink-0
                             w-[calc(100%-1rem)]
                             sm:w-[calc(50%-0.625rem)]
                             lg:w-[calc(33.333%-0.833rem)]
                             xl:w-[calc(25%-0.9375rem)]"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(image.fullUrl);
                      setModalImageLoaded(false);
                    }}
                    className="relative block w-full aspect-[4/3] cursor-pointer group overflow-hidden rounded-xl
                               hover:scale-[1.02] active:scale-[0.99] transition-transform duration-300"
                    aria-label={`Enlarge ${image.alt}`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full p-3">
                        <svg
                          className="w-6 h-6 text-neutral-800 dark:text-neutral-200"
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
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {BEHOLD_FEED_ID && (
            <div
              ref={feedSection.ref}
              className={`transition-all duration-700 ease-out ${
                feedSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-display font-light text-neutral-900 dark:text-neutral-100 mb-2">
                  {instagramHandle ? `Follow ${instagramHandle}` : "Follow us on Instagram"}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Behind-the-scenes moments and performance highlights
                </p>
              </div>

              <div className="card p-3 sm:p-4 md:p-6 min-h-[280px]">
                <behold-widget feed-id={BEHOLD_FEED_ID}></behold-widget>
              </div>

              {instagramUrl && (
                <div className="text-center mt-6">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                  >
                    View more on Instagram
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md
                     animate-[fadeIn_200ms_ease-out]"
          onClick={() => {
            setSelectedImage(null);
            setModalImageLoaded(false);
          }}
        >
          <div
            className="relative max-w-6xl w-full h-[90vh] flex items-center justify-center
                       animate-[popIn_250ms_cubic-bezier(0.34,1.56,0.64,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            {!modalImageLoaded && (
              <div className="absolute inset-0 bg-neutral-800 animate-pulse rounded-lg" />
            )}

            <Image
              src={selectedImage}
              alt="Enlarged gallery image"
              fill
              className={`object-contain rounded-lg transition-opacity duration-300 ${
                modalImageLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="90vw"
              priority
              onLoad={() => setModalImageLoaded(true)}
            />

            <button
              onClick={() => {
                setSelectedImage(null);
                setModalImageLoaded(false);
              }}
              className="absolute top-4 right-4 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full p-2
                         hover:bg-white dark:hover:bg-neutral-800 transition-colors duration-300 z-10"
              aria-label="Close image"
            >
              <svg
                className="w-6 h-6 text-neutral-800 dark:text-neutral-200"
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
          </div>
        </div>
      )}
    </>
  );
};

export default Photos;
