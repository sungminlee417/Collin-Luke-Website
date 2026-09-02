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
      className={`card border-l-4 border-l-muse-red p-6 md:p-8 transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-display font-light text-neutral-900 dark:text-neutral-100 mb-2">
            {campaign.title}
          </h3>
          {campaign.description && (
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {campaign.description}
            </p>
          )}
        </div>

        <a
          href={campaign.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary shrink-0"
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
  )
}

export default CampaignCard
