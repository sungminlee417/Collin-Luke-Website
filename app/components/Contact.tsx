"use client";

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";
import type { ContactData } from "../../sanity/lib/types";
import { useInView } from "../lib/useInView";

interface ContactProps {
  data: ContactData | null;
}

const Contact = ({ data }: ContactProps) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const left = useInView<HTMLDivElement>();
  const right = useInView<HTMLDivElement>();

  const contactImageUrl = data?.contactImage
    ? urlForImage(data.contactImage).width(1200).quality(85).url()
    : null;

  const handleSendMailSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const email = data?.email || "themuseduo@gmail.com";
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(
        subject || ""
      )}&body=${encodeURIComponent(message || "")}`;
      setIsSubmitting(false);
      setSubject("");
      setMessage("");
    }, 500);
  };

  return (
    <section className="contact-section relative">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div
            ref={left.ref}
            className={`order-2 lg:order-1 transition-all duration-700 ease-out ${
              left.inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="text-center lg:text-left mb-8">
              <h2 className="heading-2 text-muse-red dark:text-red-400 mb-4">
                {data?.title || "Connect with us!"}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-2">
                {data?.subtitle || "We'd love to hear from you"}
              </p>
              <a
                href={`mailto:${data?.email || "themuseduo@gmail.com"}`}
                className="inline-flex items-center gap-2 text-muse-red dark:text-red-400 font-medium
                           hover:text-red-700 hover:scale-105 active:scale-95 transition-all duration-300 break-all sm:break-normal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {data?.email || "themuseduo@gmail.com"}
              </a>
            </div>

            <form
              className={`card-modern p-8 transition-all duration-700 ease-out ${
                left.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: "200ms" }}
              onSubmit={handleSendMailSubmit}
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="input-modern"
                    placeholder="What would you like to discuss?"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="textarea-modern"
                    placeholder="Tell us more..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full btn-primary flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform ${
                    isSubmitting ? "opacity-75 cursor-wait" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
              {data?.social?.instagram && (
                <a
                  href={data.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-muse-red hover:text-white
                             hover:scale-110 hover:rotate-6 active:scale-90 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                  </svg>
                </a>
              )}
              {data?.social?.youtube && (
                <a
                  href={data.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-muse-red hover:text-white
                             hover:scale-110 hover:-rotate-6 active:scale-90 transition-all duration-300"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div
            ref={right.ref}
            className={`order-1 lg:order-2 transition-all duration-700 ease-out ${
              right.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group">
              {contactImageUrl && (
                <Image
                  src={contactImageUrl}
                  alt="Contact Image"
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/50 dark:to-black/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
