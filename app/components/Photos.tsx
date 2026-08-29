"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";
import type { GalleryImage } from "../../sanity/lib/types";
import { useInView } from "../lib/useInView";

interface PhotosSocial {
  instagram?: string;
  youtube?: string;
  spotify?: string;
  appleMusic?: string;
  email?: string;
}

interface PhotosProps {
  images: GalleryImage[];
  social?: PhotosSocial;
}

function handleFromUrl(url: string) {
  try {
    const path = new URL(url).pathname.replace(/^\/|\/$/g, "");
    return path ? `@${path}` : null;
  } catch {
    return null;
  }
}

const Photos = ({ images, social }: PhotosProps) => {
  const instagramUrl = social?.instagram;
  const youtubeUrl = social?.youtube;
  const spotifyUrl = social?.spotify;
  const email = social?.email;
  const instagramHandle = instagramUrl ? handleFromUrl(instagramUrl) : null;
  const socialTiles = [
    instagramUrl && { key: "instagram", href: instagramUrl },
    youtubeUrl && { key: "youtube", href: youtubeUrl },
    spotifyUrl && { key: "spotify", href: spotifyUrl },
    email && { key: "email", href: `mailto:${email}` },
  ].filter(Boolean) as { key: string; href: string }[];
  const showBottomPanels = !!instagramUrl || socialTiles.length > 0;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const header = useInView<HTMLDivElement>();
  const carousel = useInView<HTMLDivElement>();
  const socialPanel = useInView<HTMLDivElement>();

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

          {showBottomPanels && (
            <div
              ref={socialPanel.ref}
              className={`grid grid-cols-1 ${
                instagramUrl && socialTiles.length > 0 ? "lg:grid-cols-2" : ""
              } gap-8 lg:gap-12 items-start transition-all duration-700 ease-out ${
                socialPanel.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-hover p-6 md:p-8 group flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <SocialIcon name="instagram" className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-1">
                    Follow Our Journey
                  </h3>
                  {instagramHandle && (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
                      {instagramHandle} on Instagram
                    </p>
                  )}
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-sm">
                    Behind-the-scenes moments and performance highlights, straight from the duo.
                  </p>
                  <span className="btn-primary text-sm px-5 py-2.5 pointer-events-none">
                    Visit Profile
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </a>
              )}

              {socialTiles.length > 0 && (
                <div className="card p-6 md:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-normal text-neutral-900 dark:text-neutral-100 mb-2">
                      Connect With Us
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Listen to our music and stay updated
                    </p>
                  </div>

                  <div
                    className={`grid gap-4 ${
                      socialTiles.length >= 2 ? "grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {socialTiles.map((tile) => (
                      <SocialTile
                        key={tile.key}
                        href={tile.href}
                        label={LABELS[tile.key]}
                        bg={BG[tile.key]}
                        external={tile.key !== "email"}
                      >
                        <SocialIcon name={tile.key} className="w-5 h-5 text-white" />
                      </SocialTile>
                    ))}
                  </div>
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

const LABELS: Record<string, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  spotify: "Spotify",
  email: "Email",
};

const BG: Record<string, string> = {
  instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
  youtube: "bg-red-500",
  spotify: "bg-green-500",
  email: "bg-blue-500",
};

function SocialIcon({ name, className }: { name: string; className?: string }) {
  switch (name) {
    case "instagram":
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "spotify":
      return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.6 0-.359.24-.66.54-.78 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.021zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.18 10.561 18.72 12.84c.361.181.48.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      );
    case "email":
      return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    default:
      return null;
  }
}

function SocialTile({
  href,
  label,
  bg,
  children,
  external = true,
}: {
  href: string;
  label: string;
  bg: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex flex-col items-center p-4 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-sm
                 hover:shadow-md hover:-translate-y-1 hover:scale-105 active:scale-95
                 transition-all duration-300"
    >
      <div
        className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}
      >
        {children}
      </div>
      <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
        {label}
      </span>
    </a>
  );
}

export default Photos;
