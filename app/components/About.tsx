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
  subtitle: string;
  content: string;
  profileImage: string;
  profileImageAlt: string;
  artists: Artist[];
}

const About = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-20%" });
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/about");
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error("Error loading about data:", error);
        // Fallback to default content
        setAboutData({
          title: "About",
          subtitle:
            "The Muse Duo is a guitar and piano ensemble formed at the Eastman School of Music, bringing together classical, contemporary, and experimental works.",
          content: "",
          profileImage:
            "https://the-muse-duo.s3.us-west-1.amazonaws.com/duo-without-instruments.jpeg",
          profileImageAlt: "The Muse Duo professional portrait",
          artists: [
            { name: "Collin Holloway", instrument: "Guitar" },
            { name: "Luke Benedict", instrument: "Piano & Composer" },
          ],
        });
      }
    };

    fetchAboutData();
  }, []);

  return (
    <section className="about-section relative" style={{ minHeight: "200vh" }}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800" />
      <div
        className="container-custom section-padding relative z-10"
        style={{ display: "flex", gap: "3rem" }}
      >
        {/* Image Section - Sticky */}
        <div style={{ width: "40%" }}>
          <div
            style={{
              position: "sticky",
              top: "2rem",
            }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
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
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/40 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                <div className="space-y-2">
                  <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                    Featured Artists
                  </div>
                  <div className="text-neutral-900 dark:text-neutral-100 font-medium">
                    {aboutData?.artists
                      ?.map((artist) => artist.name)
                      .join(" • ") || "Collin Holloway • Luke Benedict"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content to scroll */}
        <div style={{ width: "60%", minHeight: "150vh" }}>
          <h2 className="heading-2 text-muse-red dark:text-red-400 mb-4">
            {aboutData?.title || "About"}
          </h2>

          <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-light mb-8">
            {aboutData?.subtitle ||
              "The Muse Duo is a guitar and piano ensemble formed at the Eastman School of Music, bringing together classical, contemporary, and experimental works."}
          </p>

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
              <>
                <p className="text-lg text-neutral-700 dark:text-neutral-200 mb-6">
                  Originally formed at the{" "}
                  <strong className="text-neutral-900 dark:text-neutral-100">
                    Eastman School of Music
                  </strong>
                  , the Muse Duo brings together the talents of guitarist{" "}
                  <strong className="text-neutral-900 dark:text-neutral-100">
                    Collin Holloway
                  </strong>{" "}
                  and pianist-composer{" "}
                  <strong className="text-neutral-900 dark:text-neutral-100">
                    Luke Benedict
                  </strong>{" "}
                  in a truly unique chamber music experience.
                </p>

                <p className="text-neutral-700 dark:text-neutral-200 mb-6">
                  Their repertoire primarily consists of Luke's original
                  compositions, where melodically focused, neo-classically
                  inspired works engage audiences through modernistic rhythmic
                  drive. The duo's debut album,
                  <em className="text-accent-600 dark:text-accent-400">
                    "Experiments"
                  </em>
                  , showcases this innovative approach entirely through original
                  music.
                </p>

                <p className="text-neutral-700 dark:text-neutral-200">
                  The Muse Duo has performed at prestigious venues and festivals
                  including the Lynn New Music Festival, Off the Dock Chamber
                  Festival, and the Shellpoint Young Artist Series, always
                  fostering collaboration and innovation in the purest, most
                  modern sense of chamber music.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
