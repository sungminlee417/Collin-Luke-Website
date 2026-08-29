"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "../../sanity/lib/image";
import type { AboutData } from "../../sanity/lib/types";

interface AboutProps {
  data: AboutData | null;
}

const About = ({ data }: AboutProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const profileUrl = data?.profileImage
    ? urlForImage(data.profileImage).width(1000).quality(85).url()
    : null;

  return (
    <section className="about-section relative">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800" />
      <div className="container-custom py-12 md:py-16 lg:py-20 relative z-10 flex flex-col md:flex-row md:gap-12">
        <div className="w-full md:w-2/5 mb-8 md:mb-0">
          <div className="md:sticky md:top-8">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              {!imageLoaded && (
                <div className="absolute inset-0 z-10">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 animate-pulse" />
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
                </div>
              )}

              {profileUrl && (
                <>
                  <Image
                    src={profileUrl}
                    alt={data?.profileImageAlt || "The Muse Duo professional portrait"}
                    fill
                    className={`object-cover object-top transition-opacity duration-500 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    sizes="(max-width: 768px) 100vw, 40vw"
                    onLoad={() => setImageLoaded(true)}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent transition-opacity duration-500 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/5">
          <h2 className="heading-2 text-muse-red dark:text-red-400 mb-8">
            {data?.title || "About"}
          </h2>

          <div className="space-y-6 leading-relaxed">
            {data?.body ? (
              <div
                className="prose prose-lg prose-neutral dark:prose-invert max-w-none
                         prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100
                         prose-p:text-neutral-700 dark:prose-p:text-neutral-200
                         prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100
                         prose-em:text-accent-600 dark:prose-em:text-accent-400
                         prose-a:text-accent-600 dark:prose-a:text-accent-400
                         prose-blockquote:text-neutral-600 dark:prose-blockquote:text-neutral-300
                         prose-code:text-accent-600 dark:prose-code:text-accent-400"
              >
                <PortableText value={data.body} />
              </div>
            ) : (
              <div className="text-neutral-700 dark:text-neutral-200">
                <p className="mb-6">
                  Unable to load about content. Please try refreshing the page.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
