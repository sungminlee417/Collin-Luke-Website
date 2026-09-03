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
  const [activeSection, setActiveSection] = useState('')

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
        setScrolled(window.scrollY > 80)
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((s) => ({
        name: s.section,
        el: document.querySelector<HTMLElement>(`.${s.section}-section`),
      }))
      const y = window.scrollY + window.innerHeight / 3
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i]
        if (s.el && y >= s.el.offsetTop) {
          setActiveSection(s.name)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items])

  const scrollTo = (section: string) => {
    setShowMenu(false)
    setTimeout(() => {
      document
        .querySelector(`.${section}-section`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }

  return (
    <>
      {/* Soft gradient behind the transparent nav so white text always reads over any hero image */}
      <div
        className={`fixed top-0 left-0 right-0 z-30 h-28 pointer-events-none transition-opacity duration-500 bg-gradient-to-b from-black/50 to-transparent ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden
      />

      {/* Top nav bar — visible always, tightens on scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 border-b transition-[background-color,padding,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? 'bg-white/85 dark:bg-neutral-950/85 backdrop-blur-xl border-neutral-200/60 dark:border-neutral-800/60 py-3'
            : 'bg-transparent border-transparent py-6 [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]'
        }`}
      >
        <div className="section-inner flex items-center justify-between">
          {/* Wordmark */}
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            className={`font-display font-light tracking-tight transition-all duration-500 ${
              scrolled
                ? 'text-xl text-neutral-900 dark:text-neutral-50'
                : 'text-2xl text-white'
            }`}
            title="Back to top"
          >
            Muse Duo
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {items.map((item) => {
              const isActive = activeSection === item.section
              return (
                <button
                  key={item.section}
                  onClick={() => scrollTo(item.section)}
                  className={`relative text-[13px] tracking-[0.05em] font-medium transition-colors duration-200 ${
                    scrolled
                      ? isActive
                        ? 'text-red-700 dark:text-red-400'
                        : 'text-neutral-700 dark:text-neutral-300 hover:text-red-700 dark:hover:text-red-400'
                      : isActive
                      ? 'text-white'
                      : 'text-white/85 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className={`absolute -bottom-1.5 left-0 right-0 h-px ${
                        scrolled ? 'bg-red-700 dark:bg-red-400' : 'bg-white'
                      }`}
                    />
                  )}
                </button>
              )
            })}
            {/* Separator + theme toggle, inheriting nav color state */}
            <span
              className={`w-px h-4 transition-colors duration-500 ${
                scrolled
                  ? 'bg-neutral-300 dark:bg-neutral-700'
                  : 'bg-white/30'
              }`}
              aria-hidden
            />
            <ThemeToggle
              className={
                scrolled
                  ? 'text-neutral-700 dark:text-neutral-300 hover:text-muse-red dark:hover:text-red-400'
                  : 'text-white/85 hover:text-white'
              }
            />
          </nav>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle
              className={
                scrolled
                  ? 'text-neutral-700 dark:text-neutral-300'
                  : 'text-white'
              }
            />
            <button
              onClick={() => setShowMenu(true)}
              className={`w-10 h-10 flex flex-col items-center justify-center gap-1.5 ${
                scrolled
                  ? 'text-neutral-900 dark:text-neutral-50'
                  : 'text-white'
              }`}
              aria-label="Open menu"
              aria-expanded={showMenu}
            >
              <span className="w-6 h-px bg-current" />
              <span className="w-6 h-px bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          showMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-neutral-950/95 backdrop-blur-xl"
          onClick={() => setShowMenu(false)}
        />
        <div className="relative h-full flex flex-col">
          <div className="flex justify-end p-6">
            <button
              onClick={() => setShowMenu(false)}
              className="w-10 h-10 text-white flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
            {items.map((item, i) => (
              <button
                key={item.section}
                onClick={() => scrollTo(item.section)}
                className={`text-left font-display font-light text-4xl text-white/90 hover:text-white active:text-red-400 transition-colors py-2 ${
                  showMenu ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}
                style={{
                  transition: `opacity 400ms ease-out ${i * 60}ms, transform 400ms ease-out ${i * 60}ms, color 200ms`,
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
          {/* Theme toggle at the bottom of the mobile menu so users don't have to close it */}
          <div className="p-8 border-t border-white/10 flex items-center justify-between text-white/70">
            <span className="text-xs tracking-[0.25em] uppercase">Appearance</span>
            <ThemeToggle className="text-white/80 hover:text-white" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
