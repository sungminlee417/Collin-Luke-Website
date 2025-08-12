'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'

interface MenuItem {
  label: string;
  section: string;
  order: number;
}

interface NavigationData {
  menuItems: MenuItem[];
  showLogo: boolean;
}

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [, setActiveSection] = useState('')
  const [navigationData, setNavigationData] = useState<NavigationData | null>(null)
  const { scrollY } = useScroll()

  // Default sections as fallback
  const defaultSections = [
    { label: 'About', section: 'about', order: 1 },
    { label: 'Concerts', section: 'concerts', order: 2 },
    { label: 'Music', section: 'recordings', order: 3 },
    { label: 'Gallery', section: 'photos', order: 4 },
    { label: 'Press', section: 'press', order: 5 },
    { label: 'Contact', section: 'contact', order: 6 },
  ]

  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        const response = await fetch('/api/settings?type=navigation');
        const data = await response.json();
        setNavigationData(data);
      } catch (error) {
        console.error('Error loading navigation data:', error);
        // Use fallback data
        setNavigationData({
          menuItems: defaultSections,
          showLogo: false
        });
      }
    };

    fetchNavigationData();
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showMenu])

  // Track active section
  useEffect(() => {
    if (!navigationData) return;
    
    const handleScroll = () => {
      const sections = navigationData.menuItems.map(section => ({
        name: section.section,
        element: document.querySelector(`.${section.section}-section`)
      }))

      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          
          if (scrollPosition >= elementTop) {
            setActiveSection(section.name)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navigationData])

  const scrollSmoothlyTo = (className: string) => {
    setShowMenu(false)
    setTimeout(() => {
      const element = document.querySelector(`.${className}`)
      element?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      })
    }, 300)
  }

  return (
    <>
      {/* Navigation Button */}
      <div className={`fixed z-50 transition-all duration-700 ${
        scrolled 
          ? 'top-4 right-4' 
          : 'top-6 right-6'
      }`}>
        <div className="flex gap-3 items-center">
          <div className="transition-transform duration-200 hover:scale-110 active:scale-90">
            <ThemeToggle />
          </div>
          
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`group relative h-16 w-16 rounded-3xl transition-all duration-500
                       ${scrolled 
                         ? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-xl border border-neutral-200/50 dark:border-neutral-700/50' 
                         : 'bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl shadow-2xl border border-white/30 dark:border-neutral-700/30'
                       }
                       hover:scale-110 active:scale-95`}
            aria-label="Toggle navigation menu"
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

      {/* Navigation Menu */}
      <AnimatePresence>
        {showMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-neutral-900/80 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowMenu(false)}
            />
            
            {/* Navigation Panel */}
            <motion.nav
              className="fixed inset-0 z-40 flex items-center justify-center"
              initial={{ clipPath: "circle(0% at calc(100% - 4rem) 4rem)" }}
              animate={{ clipPath: "circle(150% at calc(100% - 4rem) 4rem)" }}
              exit={{ clipPath: "circle(0% at calc(100% - 4rem) 4rem)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700" />
              

              {/* Menu Items */}
              <div className="relative z-10 flex flex-col items-center gap-4 max-w-lg mx-auto px-8">
                {(navigationData?.menuItems || defaultSections)
                  .sort((a, b) => a.order - b.order)
                  .map((section, i) => (
                  <motion.button
                    key={section.section}
                    className="text-white font-display font-light text-2xl md:text-3xl tracking-wide hover:text-white/80 transition-all duration-300 hover:translate-x-2"
                    onClick={() => scrollSmoothlyTo(`${section.section}-section`)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                  >
                    {section.label}
                  </motion.button>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Keyboard navigation */}
      {showMenu && (
        <div
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setShowMenu(false)
            }
          }}
          tabIndex={-1}
          className="sr-only"
        />
      )}
    </>
  )
}

export default Navigation