"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { Recording } from "../../sanity/lib/types";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <div className="w-10 h-10 rounded-full border-2 border-white/30 border-t-white animate-spin" />
    </div>
  ),
});

interface RecordingsProps {
  recordings: Recording[];
}

const ALBUM = {
  href: "https://open.spotify.com/album/06Q4h44XDIYrpE0EbGAFMy",
  appleMusic: "https://music.apple.com/us/album/experiments/1679950066",
  cover: "/images/IMG_6718.jpg",
  title: "Experiments",
  subtitle: "The Muse Duo's Debut Album",
  year: "2023",
  tracks: 15,
  duration: "51 min",
};

const Recordings: React.FC<RecordingsProps> = ({ recordings }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeRecording = activeIdx !== null ? recordings[activeIdx] : null;

  return (
    <section className="recordings-section section section-white">
      <div className="section-inner">
        {/* Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <div className="eyebrow mb-6">Discography</div>
          <h2 className="display-section">Listen</h2>
          <p className="lead mt-6">
            Experiments (2023) — an album of original works for guitar and piano
            by Luke Benedict, plus featured live recordings.
          </p>
        </div>

        {/* Player + track list */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 lg:gap-14">
          {/* Left: featured/active media (video player if a track is selected, else album cover) */}
          <div className="col-span-12 lg:col-span-7">
            {activeRecording ? (
              <div className="space-y-4">
                <div className="rounded-sm overflow-hidden shadow-2xl bg-black aspect-video">
                  <ReactPlayer
                    url={activeRecording.url}
                    width="100%"
                    height="100%"
                    playing={isPlaying}
                    controls
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-display font-light text-2xl md:text-3xl text-neutral-900 dark:text-neutral-50 leading-tight">
                      {activeRecording.title}
                    </h3>
                    {activeRecording.composer && (
                      <p className="meta mt-2">{activeRecording.composer}</p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setActiveIdx(null);
                      setIsPlaying(false);
                    }}
                    className="text-sm text-neutral-500 hover:text-muse-red dark:hover:text-red-400 transition-colors"
                  >
                    ← Back to album
                  </button>
                </div>
              </div>
            ) : (
              <a
                href={ALBUM.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative aspect-square rounded-sm overflow-hidden shadow-2xl"
              >
                <Image
                  src={ALBUM.cover}
                  alt={`${ALBUM.title} album cover`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                  <div className="text-xs tracking-[0.3em] uppercase text-white/70 mb-3">
                    Debut Album · {ALBUM.year}
                  </div>
                  <div className="font-display font-light text-4xl md:text-6xl leading-none mb-3">
                    {ALBUM.title}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    <span>{ALBUM.tracks} tracks</span>
                    <span className="w-px h-3 bg-white/40" />
                    <span>{ALBUM.duration}</span>
                    <span className="w-px h-3 bg-white/40" />
                    <span className="underline underline-offset-4">
                      Listen on Spotify
                    </span>
                  </div>
                </div>
              </a>
            )}
          </div>

          {/* Right: track/recording list */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center justify-between mb-4">
              <span className="meta">Featured recordings</span>
              <span className="meta">{recordings.length}</span>
            </div>
            <ul className="border-t border-neutral-200 dark:border-neutral-800">
              {recordings.map((r, i) => {
                const active = activeIdx === i;
                return (
                  <li
                    key={r.slug}
                    className="border-b border-neutral-200 dark:border-neutral-800"
                  >
                    <button
                      onClick={() => {
                        setActiveIdx(i);
                        setIsPlaying(true);
                        // Scroll the player into view on mobile
                        if (window.innerWidth < 1024) {
                          setTimeout(() => {
                            document
                              .querySelector(".recordings-section")
                              ?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }, 50);
                        }
                      }}
                      className={`w-full text-left py-4 px-2 -mx-2 rounded-sm transition-colors duration-200 group flex items-center gap-4 ${
                        active
                          ? "bg-neutral-100 dark:bg-neutral-900"
                          : "hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60"
                      }`}
                    >
                      <span
                        className={`font-display font-light text-xl w-8 shrink-0 tabular-nums ${
                          active
                            ? "text-red-700 dark:text-red-400"
                            : "text-neutral-500 dark:text-neutral-500"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div
                          className={`font-medium truncate transition-colors ${
                            active
                              ? "text-red-700 dark:text-red-400"
                              : "text-neutral-900 dark:text-neutral-50 group-hover:text-muse-red dark:group-hover:text-red-400"
                          }`}
                        >
                          {r.title}
                        </div>
                        {r.composer && (
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                            {r.composer}
                          </div>
                        )}
                      </div>
                      {r.duration && (
                        <span className="shrink-0 text-xs tabular-nums text-neutral-500 dark:text-neutral-400">
                          {r.duration}
                        </span>
                      )}
                      <svg
                        className={`w-4 h-4 shrink-0 transition-opacity ${
                          active
                            ? "opacity-100 text-red-700 dark:text-red-400"
                            : "opacity-0 group-hover:opacity-60 text-neutral-500"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Listen on links */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="meta">Available on</span>
              <a
                href={ALBUM.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-800 dark:text-neutral-200 hover:text-muse-red dark:hover:text-red-400 underline underline-offset-4"
              >
                Spotify
              </a>
              <span className="text-neutral-300 dark:text-neutral-700" aria-hidden>·</span>
              <a
                href={ALBUM.appleMusic}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-800 dark:text-neutral-200 hover:text-muse-red dark:hover:text-red-400 underline underline-offset-4"
              >
                Apple Music
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recordings;
