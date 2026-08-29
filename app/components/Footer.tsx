'use client'

import React, { useMemo } from 'react'
import Image from 'next/image'
import type { SocialLink } from '../../sanity/lib/types'
import { useInView } from '../lib/useInView'

const DEFAULT_SOCIAL: SocialLink[] = [
  { name: 'YouTube', href: 'https://www.youtube.com/@TheMuseDuo', order: 1 },
  { name: 'Instagram', href: 'https://www.instagram.com/muse__duo/', order: 2 },
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
  const row = useInView<HTMLDivElement>()
  const tag = useInView<HTMLDivElement>()

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'youtube':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        )
      case 'instagram':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
          </svg>
        )
      default:
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        )
    }
  }

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container-custom py-12">
        <div
          ref={row.ref}
          className={`flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-700 ease-out ${
            row.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="transition-transform duration-500 hover:rotate-[360deg]">
              <Image
                src="/images/icon.png"
                alt="Muse Duo Icon"
                width={40}
                height={40}
                className="opacity-80"
              />
            </div>
            <div>
              <p className="text-sm font-normal text-gray-800 dark:text-gray-200">
                {title || 'The Muse Duo'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                © {year} All rights reserved
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            {links.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 dark:text-gray-400 hover:text-muse-red dark:hover:text-red-400
                            hover:scale-125 hover:rotate-6 active:scale-90
                            transition-all duration-300 ease-out ${
                              row.inView ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                            }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                aria-label={link.name}
              >
                {getSocialIcon(link.name)}
              </a>
            ))}
          </nav>
        </div>

        <div
          ref={tag.ref}
          className={`mt-8 pt-8 border-t border-gray-200 text-center transition-opacity duration-700 ${
            tag.inView ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {tagline || 'Classical music reimagined for modern audiences'}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
