'use client'

import React from 'react'
import { motion } from 'framer-motion'
import concerts from '../data/concerts'

const Concerts = () => {
  const isUpcoming = (concert: typeof concerts[0]) => {
    const concertDate = new Date(`${concert.startDate.month} ${concert.startDate.day}, ${concert.startDate.year}`)
    return concertDate >= new Date()
  }

  const upcomingConcerts = concerts.filter(isUpcoming)
  const pastConcerts = concerts.filter(c => !isUpcoming(c))

  const ConcertCard = ({ concert, index }: { concert: typeof concerts[0], index: number }) => (
    <motion.div
      className="card-modern p-6 hover-lift"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 text-center">
          <div className="bg-gradient-to-br from-muse-red to-red-600 text-white rounded-xl p-4 shadow-lg">
            <div className="text-3xl font-bold">{concert.startDate.day}</div>
            <div className="text-sm uppercase tracking-wider">{concert.startDate.month}</div>
            <div className="text-xs mt-1 opacity-90">{concert.startDate.year}</div>
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-normal text-gray-900 dark:text-gray-100 mb-2">{concert.venue}</h3>
          
          {concert.time && (
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">{concert.time}</span>
            </div>
          )}

          <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400 mb-4">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{concert.location}</span>
          </div>

          <div className="flex gap-3">
            {concert.ticketUrl && (
              <a
                href={concert.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-muse-red dark:bg-red-600 text-white rounded-lg
                         hover:bg-red-700 dark:hover:bg-red-700 transition-all duration-300 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                Get Tickets
              </a>
            )}
            {concert.moreInfoUrl && (
              <a
                href={concert.moreInfoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-muse-red dark:border-red-400 
                         text-muse-red dark:text-red-400 rounded-lg hover:bg-muse-red dark:hover:bg-red-600 
                         hover:text-white transition-all duration-300 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                More Info
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <section className="concerts-section bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container-custom section-padding">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-2 text-muse-red dark:text-red-400 mb-4">Concerts</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Experience The Muse Duo live in concert. Join us for an unforgettable evening of classical music.
          </p>
        </motion.div>

        {upcomingConcerts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-normal text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Upcoming Concerts
            </h3>
            <div className="grid gap-6">
              {upcomingConcerts.map((concert, index) => (
                <ConcertCard key={index} concert={concert} index={index} />
              ))}
            </div>
          </div>
        )}

        {pastConcerts.length > 0 && (
          <div>
            <h3 className="text-2xl font-normal text-gray-800 dark:text-gray-200 mb-6">Past Concerts</h3>
            <div className="grid gap-6 opacity-75">
              {pastConcerts.map((concert, index) => (
                <ConcertCard key={index} concert={concert} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Concerts