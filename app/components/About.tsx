"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";

interface Artist {
  name: string;
  instrument: string;
}

interface AboutData {
  title: string;
  content: string;
  profileImage: string;
  profileImageAlt: string;
  artists: Artist[];
}

const About = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-20%" });
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/about");
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error("Error loading about data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <section className="about-section relative">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800" />
      <div className="container-custom py-12 md:py-16 lg:py-20 relative z-10 flex flex-col md:flex-row md:gap-12">
        {/* Image Section - Normal flow on mobile, sticky on desktop */}
        <div className="w-full md:w-2/5 mb-8 md:mb-0">
          <div className="md:sticky md:top-8">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              {/* Loading skeleton */}
              {(isLoading || !imageLoaded) && (
                <div className="absolute inset-0 z-10">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 animate-pulse" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent" />
                </div>
              )}
              
              {/* Actual image */}
              {!isLoading && (
                <>
                  <Image
                    src={
                      aboutData?.profileImage ||
                      "https://the-muse-duo.s3.us-west-1.amazonaws.com/duo-without-instruments.jpeg"
                    }
                    alt={
                      aboutData?.profileImageAlt ||
                      "The Muse Duo professional portrait"
                    }
                    fill
                    className={`object-cover object-top transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    sizes="(max-width: 768px) 100vw, 40vw"
                    onLoad={() => setImageLoaded(true)}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content to scroll */}
        <div className="w-full md:w-3/5">
          {isLoading ? (
            <>
              {/* Title skeleton */}
              <div className="h-12 w-32 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded-lg mb-8" />
              
              {/* Content skeleton */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" />
                  <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" />
                  <div className="h-4 w-4/5 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" />
                </div>
                
                <div className="space-y-3">
                  <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" />
                  <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" />
                  <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" />
                  <div className="h-4 w-2/3 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" />
                </div>
                
                <div className="space-y-3">
                  <div className="h-4 w-4/5 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" />
                  <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" />
                  <div className="h-4 w-3/5 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" />
                </div>
                
                <div className="space-y-3">
                  <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" />
                  <div className="h-4 w-4/5 bg-neutral-200 dark:bg-neutral-700 animate-pulse rounded" />
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="heading-2 text-muse-red dark:text-red-400 mb-8">
                {aboutData?.title || "About"}
              </h2>

              <div className="space-y-6 leading-relaxed">
                {aboutData?.content ? (
                  <div
                    className="prose prose-lg prose-neutral dark:prose-invert max-w-none
                             prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100
                             prose-p:text-neutral-700 dark:prose-p:text-neutral-200
                             prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100
                             prose-em:text-accent-600 dark:prose-em:text-accent-400
                             prose-a:text-accent-600 dark:prose-a:text-accent-400
                             prose-blockquote:text-neutral-600 dark:prose-blockquote:text-neutral-300
                             prose-code:text-accent-600 dark:prose-code:text-accent-400"
                    dangerouslySetInnerHTML={{ __html: aboutData.content }}
                  />
                ) : (
                  <div className="text-neutral-700 dark:text-neutral-200">
                    <p className="mb-6">
                      Unable to load about content. Please try refreshing the page.
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
