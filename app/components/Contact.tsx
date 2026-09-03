"use client";

import React from "react";
import Image from "next/image";
import { urlForImage, sanityLoader } from "../../sanity/lib/image";
import type { ContactData } from "../../sanity/lib/types";
import { SocialIcon } from "./SocialIcon";

interface ContactProps {
  data: ContactData | null;
}

const Contact = ({ data }: ContactProps) => {
  const contactImageUrl = data?.contactImage
    ? urlForImage(data.contactImage).url()
    : null;
  const email = data?.email;
  const social = data?.social || {};
  const socialEntries = [
    { key: "instagram", label: "Instagram", href: social.instagram },
    { key: "youtube", label: "YouTube", href: social.youtube },
    { key: "spotify", label: "Spotify", href: social.spotify },
    { key: "appleMusic", label: "Apple Music", href: social.appleMusic },
    { key: "facebook", label: "Facebook", href: social.facebook },
  ].filter((e) => !!e.href) as { key: string; label: string; href: string }[];

  return (
    <section className="contact-section section section-tint">
      <div className="section-inner">
        <div className="grid grid-cols-12 gap-6 md:gap-10 lg:gap-14">
          {/* Left: image */}
          {contactImageUrl && (
            <div className="col-span-12 lg:col-span-5">
              <div className="relative aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={contactImageUrl}
                  alt="The Muse Duo"
                  fill
                  loader={sanityLoader}
                  quality={82}
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          )}

          {/* Right: editorial contact block */}
          <div
            className={`col-span-12 ${
              contactImageUrl ? "lg:col-span-7" : "lg:col-span-12"
            }`}
          >
            <div className="eyebrow mb-6">Get in touch</div>

            <h2 className="display-section mb-8">
              {data?.title || "Contact"}
            </h2>

            {data?.subtitle && (
              <p className="lead mb-12 md:mb-16">{data.subtitle}</p>
            )}

            {/* Email as the hero action */}
            {email && (
              <div className="mb-12 md:mb-16">
                <div className="meta mb-3">Booking &amp; inquiries</div>
                <a
                  href={`mailto:${email}`}
                  className="group inline-flex items-baseline gap-3 font-display font-light text-3xl md:text-5xl lg:text-6xl text-neutral-900 dark:text-neutral-50 hover:text-muse-red dark:hover:text-red-400 transition-colors break-all sm:break-normal"
                >
                  <span className="underline underline-offset-8 decoration-neutral-300 dark:decoration-neutral-700 group-hover:decoration-muse-red dark:group-hover:decoration-red-400 transition-colors">
                    {email}
                  </span>
                  <svg className="w-6 h-6 md:w-8 md:h-8 shrink-0 -translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                {data?.phone && (
                  <a
                    href={`tel:${data.phone.replace(/[^+\d]/g, '')}`}
                    className="mt-3 inline-block text-sm text-neutral-600 dark:text-neutral-400 hover:text-muse-red dark:hover:text-red-400 transition-colors"
                  >
                    {data.phone}
                  </a>
                )}
              </div>
            )}

            {/* Management (if provided) */}
            {data?.management?.name && (
              <div className="mb-12 md:mb-16">
                <div className="meta mb-3">Management</div>
                <div className="flex flex-col gap-1">
                  <span className="font-display font-light text-xl md:text-2xl text-neutral-900 dark:text-neutral-50">
                    {data.management.name}
                  </span>
                  {data.management.email && (
                    <a
                      href={`mailto:${data.management.email}`}
                      className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-muse-red dark:hover:text-red-400 transition-colors"
                    >
                      {data.management.email}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Social links row */}
            {socialEntries.length > 0 && (
              <div>
                <div className="meta mb-4">Elsewhere</div>
                <ul className="flex flex-wrap gap-2">
                  {socialEntries.map((s) => (
                    <li key={s.key}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full
                                   border border-neutral-300 dark:border-neutral-700
                                   text-neutral-800 dark:text-neutral-200
                                   hover:border-red-700 dark:hover:border-red-400
                                   hover:text-red-700 dark:hover:text-red-400
                                   transition-colors"
                      >
                        <SocialIcon name={s.key} className="w-4 h-4" />
                        <span className="text-sm font-medium">{s.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
