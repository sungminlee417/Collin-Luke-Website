'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import type { SocialLink } from '../../sanity/lib/types'
import { SocialIcon } from './SocialIcon'

const DEFAULT_SOCIAL: SocialLink[] = [
  { name: 'Instagram', href: 'https://www.instagram.com/themuseduo_/', order: 1 },
  { name: 'YouTube', href: 'https://www.youtube.com/@TheMuseDuo', order: 2 },
]

interface FooterProps {
  title?: string
  tagline?: string
  socialLinks?: SocialLink[]
}

const Footer = ({ title, tagline, socialLinks }: FooterProps) => {
  const year = new Date().getFullYear()
  const links = useMemo(
    () =>
      (socialLinks && socialLinks.length > 0 ? socialLinks : DEFAULT_SOCIAL)
        .slice()
        .sort((a, b) => a.order - b.order),
    [socialLinks]
  )

  return (
    <footer className="section-white border-t border-neutral-200 dark:border-neutral-800">
      <div className="section-inner py-12 md:py-16">
        <div className="grid grid-cols-12 gap-6 items-end">
          {/* Wordmark + tagline */}
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-4 mb-3">
              <Image
                src="/images/icon.png"
                alt=""
                width={32}
                height={32}
                className="opacity-70 dark:invert"
              />
              <span className="font-display font-light text-2xl md:text-3xl text-neutral-900 dark:text-neutral-50">
                {title || 'The Muse Duo'}
              </span>
            </div>
            {tagline && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
                {tagline}
              </p>
            )}
          </div>

          {/* Social links */}
          <nav className="col-span-12 md:col-span-4 md:text-right">
            <ul className="flex flex-wrap md:justify-end gap-2">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    title={link.name}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full
                               border border-neutral-300 dark:border-neutral-700
                               text-neutral-700 dark:text-neutral-300
                               hover:border-red-700 dark:hover:border-red-400
                               hover:text-red-700 dark:hover:text-red-400
                               transition-colors"
                  >
                    <SocialIcon name={link.name} className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom rule + copyright */}
        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-500">
          © {year} {title || 'The Muse Duo'}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
