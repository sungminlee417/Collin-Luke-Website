"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { urlForImage, sanityLoader } from "../../sanity/lib/image";
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

// Bento grid spans — clean 2-col squares on mobile; asymmetric bento from md up.
const BENTO_SPANS = [
  "col-span-1 aspect-square md:col-span-2 md:row-span-2",   // large
  "col-span-1 aspect-square",                                // small
  "col-span-1 aspect-square",                                // small
  "col-span-1 aspect-square md:row-span-2 md:aspect-[1/2]", // tall
  "col-span-1 aspect-square md:col-span-2 md:aspect-[2/1]", // wide
  "col-span-1 aspect-square",                                // small
];

const Photos = ({ images, instagramUrl }: PhotosProps) => {
  const [selected, setSelected] = useState<{ url: string; caption?: string; alt: string } | null>(null);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const feedSection = useInView<HTMLDivElement>({ rootMargin: "200px" });
  const instagramHandle = instagramUrl ? handleFromUrl(instagramUrl) : null;

  // Lazy-load Behold widget when the feed section approaches viewport.
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

  // ESC to close modal
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        setModalImageLoaded(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const galleryImages = images.map((img) => ({
    id: img._id,
    url: urlForImage(img.image).url(),
    fullUrl: urlForImage(img.image).url(),
    alt: img.alt,
    caption: img.caption,
  }));

  return (
    <>
      <section className="photos-section section section-tint">
        <div className="section-inner">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <div>
              <div className="eyebrow mb-6">Archive</div>
              <h2 className="display-section">Gallery</h2>
            </div>
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="meta hover:text-muse-red dark:hover:text-red-400 transition-colors self-start md:self-end"
              >
                {instagramHandle || "@muse__duo"} →
              </a>
            )}
          </div>

          {/* Bento grid */}
          {galleryImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[minmax(140px,auto)] gap-3 md:gap-4">
              {galleryImages.map((image, i) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => {
                    setSelected({ url: image.fullUrl, caption: image.caption, alt: image.alt });
                    setModalImageLoaded(false);
                  }}
                  className={`relative overflow-hidden rounded-sm cursor-pointer group ${
                    BENTO_SPANS[i % BENTO_SPANS.length]
                  }`}
                  aria-label={`Enlarge ${image.alt}`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    loader={sanityLoader}
                    quality={78}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      View
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Behold live feed */}
          {BEHOLD_FEED_ID && (
            <div
              ref={feedSection.ref}
              className={`mt-20 md:mt-28 pt-12 md:pt-16 border-t border-neutral-200 dark:border-neutral-800 transition-opacity duration-700 ${
                feedSection.inView ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <div className="eyebrow mb-4">Live from Instagram</div>
                  <h3 className="font-display font-light text-2xl md:text-4xl text-neutral-900 dark:text-neutral-50">
                    {instagramHandle ? `Follow ${instagramHandle}` : "Follow us on Instagram"}
                  </h3>
                </div>
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meta hover:text-muse-red dark:hover:text-red-400 transition-colors"
                  >
                    View profile →
                  </a>
                )}
              </div>

              <behold-widget feed-id={BEHOLD_FEED_ID}></behold-widget>
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md
                     animate-[fadeIn_200ms_ease-out]"
          onClick={() => {
            setSelected(null);
            setModalImageLoaded(false);
          }}
        >
          <div
            className="relative max-w-6xl w-full h-[90vh] flex flex-col items-center justify-center
                       animate-[popIn_250ms_cubic-bezier(0.34,1.56,0.64,1)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 w-full">
              {!modalImageLoaded && (
                <div className="absolute inset-0 bg-neutral-800 animate-pulse rounded-sm" />
              )}
              <Image
                src={selected.url}
                alt={selected.alt}
                fill
                loader={sanityLoader}
                quality={85}
                className={`object-contain transition-opacity duration-300 ${
                  modalImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                sizes="90vw"
                priority
                onLoad={() => setModalImageLoaded(true)}
              />
            </div>

            {selected.caption && (
              <p className="mt-4 max-w-3xl text-center text-sm md:text-base text-white/85 leading-relaxed">
                {selected.caption}
              </p>
            )}

            <button
              onClick={() => {
                setSelected(null);
                setModalImageLoaded(false);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white
                         hover:bg-white/20 transition-colors z-10 flex items-center justify-center"
              aria-label="Close image"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Photos;
