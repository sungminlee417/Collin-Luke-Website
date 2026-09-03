'use client'

import React from 'react'
import type { Campaign } from '../../sanity/lib/types'
import { useInView } from '../lib/useInView'

interface CampaignCardProps {
  campaign: Campaign
  delayMs?: number
}

const CampaignCard = ({ campaign, delayMs = 0 }: CampaignCardProps) => {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-sm px-6 py-6 md:px-8 md:py-8 transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className="grid grid-cols-12 gap-4 md:gap-6 items-center">
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
          <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-red-700 dark:text-red-400 mb-3">
            <span className="w-6 h-px bg-red-700 dark:bg-red-400" />
            Campaign
          </div>
          <h3 className="font-display font-light text-2xl md:text-3xl leading-tight text-neutral-900 dark:text-neutral-50 mb-2">
            {campaign.title}
          </h3>
          {campaign.description && (
            <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
              {campaign.description}
            </p>
          )}
        </div>

        <div className="col-span-12 md:col-span-4 lg:col-span-3 md:text-right">
          <a
            href={campaign.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            {campaign.buttonLabel || 'Learn More'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CampaignCard
