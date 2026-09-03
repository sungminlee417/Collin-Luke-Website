"use client";

import React, { useState } from "react";
import type { Campaign, Concert } from "../../sanity/lib/types";
import CampaignCard from "./CampaignCard";

interface ConcertsProps {
  concerts: Concert[];
  campaigns?: Campaign[];
}

const Concerts = ({ concerts, campaigns = [] }: ConcertsProps) => {
  const [showPast, setShowPast] = useState(false);

  const now = new Date();
  const isUpcoming = (c: Concert) => new Date(c.date) > now;
  const upcoming = concerts
    .filter(isUpcoming)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = concerts
    .filter((c) => !isUpcoming(c))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const list = showPast ? past : upcoming;
  const empty = list.length === 0;

  const fmtDate = (iso: string, tz?: string | null) => {
    const d = new Date(iso);
    const opts = tz ? { timeZone: tz } : {};
    return {
      day: d.toLocaleDateString("en-US", { day: "2-digit", ...opts }),
      month: d.toLocaleDateString("en-US", { month: "short", ...opts }),
      year: d.toLocaleDateString("en-US", { year: "numeric", ...opts }),
      time: d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        ...opts,
      }),
    };
  };

  return (
    <section className="concerts-section section section-tint">
      <div className="section-inner">
        {/* Editorial header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10 mb-12 md:mb-16">
          <div>
            <div className="eyebrow mb-6">Schedule</div>
            <h2 className="display-section">
              {showPast ? "Past performances" : "Upcoming"}
            </h2>
          </div>

          {/* Toggle: upcoming ↔ past */}
          <div className="flex items-center gap-1 rounded-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-1 self-start md:self-end">
            <button
              onClick={() => setShowPast(false)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                !showPast
                  ? "bg-red-700 text-white"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`}
            >
              Upcoming
              {upcoming.length > 0 && (
                <span className={`ml-2 text-xs ${!showPast ? 'text-white/85' : 'text-neutral-500 dark:text-neutral-400'}`}>
                  {upcoming.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowPast(true)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                showPast
                  ? "bg-red-700 text-white"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
              }`}
            >
              Past
              {past.length > 0 && (
                <span className={`ml-2 text-xs ${showPast ? 'text-white/85' : 'text-neutral-500 dark:text-neutral-400'}`}>
                  {past.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Concert list */}
        {empty ? (
          <div className="py-16 text-center border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-neutral-500 dark:text-neutral-400">
              {showPast
                ? "Past concerts will appear here."
                : "New performance announcements coming soon."}
            </p>
          </div>
        ) : (
          <ul
            key={showPast ? "past" : "upcoming"}
            className="border-t border-neutral-200 dark:border-neutral-800 animate-[fadeIn_350ms_ease-out]"
          >
            {list.map((c) => {
              const d = fmtDate(c.date, c.timezone);
              return (
                <li
                  key={c.slug}
                  className="group border-b border-neutral-200 dark:border-neutral-800"
                >
                  <div className="grid grid-cols-12 gap-4 md:gap-6 py-6 md:py-8 items-center">
                    {/* Date */}
                    <div className="col-span-3 md:col-span-2">
                      <div className="font-display font-light leading-none">
                        <div className="text-3xl md:text-5xl text-neutral-900 dark:text-neutral-50">
                          {d.day}
                        </div>
                        <div className="mt-1 md:mt-2 text-xs md:text-sm tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
                          {d.month} {d.year}
                        </div>
                      </div>
                    </div>

                    {/* Venue + location */}
                    <div className="col-span-9 md:col-span-7 min-w-0">
                      <h3 className="font-display font-light text-xl md:text-2xl lg:text-3xl text-neutral-900 dark:text-neutral-50 leading-tight group-hover:text-muse-red dark:group-hover:text-red-400 transition-colors duration-200">
                        {c.title}
                      </h3>
                      <div className="mt-1 md:mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                        <span>{c.venue}</span>
                        <span className="text-neutral-300 dark:text-neutral-700" aria-hidden>·</span>
                        <span>{c.location}</span>
                        <span className="text-neutral-300 dark:text-neutral-700" aria-hidden>·</span>
                        <span>{d.time}</span>
                      </div>
                      {c.description && (
                        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 max-w-2xl">
                          {c.description}
                        </p>
                      )}
                    </div>

                    {/* Action */}
                    <div className="col-span-12 md:col-span-3 md:text-right">
                      {!showPast && (c.ticketUrl || c.moreInfoUrl) ? (
                        <div className="flex md:flex-col md:items-end gap-x-4 gap-y-1">
                          {c.ticketUrl && (
                            <a
                              href={c.ticketUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-400
                                         hover:gap-3 transition-all duration-200"
                            >
                              Tickets
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </a>
                          )}
                          {c.moreInfoUrl && (
                            <a
                              href={c.moreInfoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400
                                         hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                            >
                              More info
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs tracking-widest uppercase text-neutral-400 dark:text-neutral-600">
                          {showPast ? "Past" : "Save the date"}
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Campaigns below */}
        {campaigns.length > 0 && (
          <div className="mt-16 space-y-4">
            {campaigns.map((campaign, i) => (
              <CampaignCard key={campaign.slug} campaign={campaign} delayMs={i * 100} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Concerts;
