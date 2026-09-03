"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlForImage, sanityLoader } from "../../sanity/lib/image";
import type { AboutData } from "../../sanity/lib/types";

interface AboutProps {
  data: AboutData | null;
}

const About = ({ data }: AboutProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const profileUrl = data?.profileImage
    ? urlForImage(data.profileImage).url()
    : null;

  return (
    <section className="about-section section section-white">
      <div className="section-inner">
        <div className="grid grid-cols-12 gap-6 md:gap-10 lg:gap-14">
          {/* Sticky editorial column: eyebrow + big title + optional artists */}
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-8 md:space-y-10">
              <div>
                <div className="eyebrow mb-6">About</div>
                <h2 className="display-section">
                  {data?.subtitle || data?.title || 'Biography'}
                </h2>
              </div>

              {/* Profile image */}
              {profileUrl && (
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
                  )}
                  <Image
                    src={profileUrl}
                    alt={
                      data?.profileImageAlt ||
                      "The Muse Duo professional portrait"
                    }
                    fill
                    loader={sanityLoader}
                    quality={82}
                    className={`object-cover object-top transition-opacity duration-700 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              )}

              {/* Artists as editorial credit block */}
              {data?.artists && data.artists.length > 0 && (
                <div className="space-y-4 pt-2">
                  <span className="rule" />
                  <dl className="grid grid-cols-1 gap-3">
                    {data.artists.map((a) => (
                      <div
                        key={a.name}
                        className="flex items-baseline justify-between gap-4"
                      >
                        <dt className="font-display font-light text-2xl md:text-3xl text-neutral-900 dark:text-neutral-50">
                          {a.name}
                        </dt>
                        <dd className="meta text-right">{a.instrument}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>

          {/* Content column */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-7">
            {data?.body ? (
              <div
                className="prose prose-lg prose-neutral dark:prose-invert max-w-none
                         prose-p:text-neutral-700 dark:prose-p:text-neutral-300
                         prose-p:leading-[1.8] prose-p:text-base md:prose-p:text-lg
                         prose-p:my-6 md:prose-p:my-8
                         first-letter:font-display first-letter:text-6xl md:first-letter:text-7xl
                         first-letter:font-light first-letter:float-left first-letter:mr-3
                         first-letter:mt-1 first-letter:leading-none
                         first-letter:text-muse-red dark:first-letter:text-red-400
                         prose-strong:text-neutral-900 dark:prose-strong:text-neutral-50 prose-strong:font-medium
                         prose-em:text-neutral-800 dark:prose-em:text-neutral-200 prose-em:italic
                         prose-a:text-red-700 dark:prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline"
              >
                <PortableText value={data.body} />
              </div>
            ) : (
              <p className="text-neutral-500">
                Unable to load about content. Please try refreshing the page.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
