'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { ThemeToggle } from './ThemeToggle'
import type { MenuItem } from '../../sanity/lib/types'

const DEFAULT_SECTIONS: MenuItem[] = [
  { label: 'About', section: 'about', order: 1 },
  { label: 'Concerts', section: 'concerts', order: 2 },
  { label: 'Music', section: 'recordings', order: 3 },
  { label: 'Gallery', section: 'photos', order: 4 },
  { label: 'Press', section: 'press', order: 5 },
  { label: 'Contact', section: 'contact', order: 6 },
]

interface NavigationProps {
  menuItems?: MenuItem[]
}

const Navigation = ({ menuItems }: NavigationProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const items = useMemo(
    () =>
      (menuItems && menuItems.length > 0 ? menuItems : DEFAULT_SECTIONS)
        .slice()
        .sort((a, b) => a.order - b.order),
    [menuItems]
  )

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showMenu ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showMenu])

  useEffect(() => {
    if (!showMenu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowMenu(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showMenu])

  const scrollSmoothlyTo = (className: string) => {
    setShowMenu(false)
    setTimeout(() => {
      document
        .querySelector(`.${className}`)
        ?.scrollIntoView({ block: 'start', behavior: 'smooth' })
    }, 300)
  }

  return (
    <>
      <div
        className={`fixed z-50 transition-all duration-700 ${
          scrolled ? 'top-4 right-4' : 'top-6 right-6'
        }`}
      >
        <div className="flex gap-3 items-center">
          <div className="transition-transform duration-200 hover:scale-110 active:scale-90">
            <ThemeToggle />
          </div>

          <button
            onClick={() => setShowMenu((v) => !v)}
            className={`group relative h-12 w-12 sm:h-14 sm:w-14 rounded-2xl transition-all duration-500 hover:scale-110 active:scale-95
                        ${
                          scrolled
                            ? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-lg border border-neutral-200/50 dark:border-neutral-700/50'
                            : 'bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl shadow-xl border border-white/30 dark:border-neutral-700/30'
                        }`}
            aria-label="Toggle navigation menu"
            aria-expanded={showMenu}
          >
            <div className="relative w-6 h-6 mx-auto">
              <span
                className={`absolute left-0 h-0.5 w-full bg-neutral-700 dark:bg-neutral-300 rounded-full transition-all duration-300 ${
                  showMenu ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-1/4'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-neutral-700 dark:bg-neutral-300 rounded-full transition-all duration-200 ${
                  showMenu ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-full bg-neutral-700 dark:bg-neutral-300 rounded-full transition-all duration-300 ${
                  showMenu ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-1/4'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-neutral-900/80 backdrop-blur-md transition-opacity duration-300 ${
          showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowMenu(false)}
        aria-hidden={!showMenu}
      />

      <nav
        className="fixed inset-0 z-40 flex items-center justify-center transition-[clip-path] duration-500 ease-in-out"
        style={{
          clipPath: showMenu
            ? 'circle(150% at calc(100% - 4rem) 4rem)'
            : 'circle(0% at calc(100% - 4rem) 4rem)',
          pointerEvents: showMenu ? 'auto' : 'none',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700" />

        <div className="relative z-10 flex flex-col items-center gap-4 max-w-lg mx-auto px-8">
          {items.map((section, i) => (
            <button
              key={section.section}
              className={`text-white font-display font-light text-2xl md:text-3xl tracking-wide
                          hover:text-white/80 hover:translate-x-2 transition-all duration-300 ease-out
                          ${showMenu ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
              style={{ transitionDelay: showMenu ? `${i * 80}ms` : '0ms' }}
              onClick={() => scrollSmoothlyTo(`${section.section}-section`)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}

export default Navigation
