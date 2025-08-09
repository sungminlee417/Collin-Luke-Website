'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { sectionName: 'About', containerName: 'about' },
  { sectionName: 'Concerts', containerName: 'concerts' },
  { sectionName: 'Music', containerName: 'recordings' },
  { sectionName: 'Gallery', containerName: 'photos' },
  { sectionName: 'Press', containerName: 'press' },
  { sectionName: 'Contact', containerName: 'contact' },
]

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <motion.div
        className={`fixed z-50 sm:top-8 sm:right-8 top-4 right-4 transition-all duration-300 ${
          scrolled ? 'sm:top-6' : ''
        }`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={`group relative cursor-pointer flex flex-col justify-center items-center 
                     h-14 w-14 sm:h-16 sm:w-16 rounded-2xl shadow-lg hover:shadow-xl 
                     transition-all duration-300 hover:scale-105 active:scale-95 
                     ${showMenu 
                       ? 'bg-white border-2 border-white shadow-2xl' 
                       : 'bg-white/90 backdrop-blur-md border border-gray-200'
                     }`}
          aria-label="Toggle navigation menu"
        >
          <div className="relative w-6 h-5 sm:w-7 sm:h-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full transition-all duration-300 
                         ${showMenu ? 'bg-muse-red rotate-45 top-1/2 -translate-y-1/2' : 'bg-gray-800'}`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full transition-all duration-300 
                         ${showMenu ? 'bg-muse-red opacity-0' : 'bg-gray-800'}`}
            />
            <span
              className={`absolute left-0 bottom-0 h-0.5 w-full transition-all duration-300 
                         ${showMenu ? 'bg-muse-red -rotate-45 bottom-1/2 translate-y-1/2' : 'bg-gray-800'}`}
            />
          </div>
        </button>
      </motion.div>

      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowMenu(false)}
            />
            
            <motion.nav
              className="fixed right-0 top-0 h-full bg-gradient-to-br from-muse-red to-red-700 
                        z-40 md:w-5/12 lg:w-4/12 w-full overflow-hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-full flex items-center justify-center p-8">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-20 -right-20 w-60 h-60 bg-white rounded-full blur-3xl" />
                  <div className="absolute bottom-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl" />
                </div>
                
                <ul className="relative flex flex-col gap-8 md:gap-10">
                  {SECTIONS.map((section, i) => (
                    <motion.li
                      key={section.containerName}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <button
                        className="group relative text-white tracking-wide xl:text-6xl lg:text-5xl text-4xl 
                                 font-medium transition-all duration-300 hover:translate-x-3"
                        onClick={() => scrollSmoothlyTo(`${section.containerName}-section`)}
                      >
                        <span className="relative">
                          {section.sectionName}
                          <span className="absolute -bottom-2 left-0 w-0 h-1 bg-white 
                                         transition-all duration-300 group-hover:w-full rounded-full" />
                        </span>
                        <span className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 
                                       group-hover:opacity-100 transition-all duration-300 text-2xl">
                          →
                        </span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation