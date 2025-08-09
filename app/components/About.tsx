'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <section className="about-section relative">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden group">
              <Image
                src="https://the-muse-duo.s3.us-west-1.amazonaws.com/duo-without-instruments.jpeg"
                alt="The Muse Duo"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 opacity-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <Image
                  src="/images/icon.png"
                  alt="Muse Duo Icon"
                  fill
                  className="object-contain"
                />
              </motion.div>

              <h2 className="heading-2 text-muse-red dark:text-red-400 mb-6">The Muse Duo</h2>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed max-h-[500px] overflow-y-auto pr-4 
                            scrollbar-thin scrollbar-thumb-muse-red/30 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg font-normal text-gray-800 dark:text-gray-200"
                >
                  Originally formed at the Eastman School of Music, the Muse Duo
                  is a one-of-a-kind ensemble in the world of classical music.
                  Comprised of the soloist and award-winning guitarist Collin
                  Holloway and the dynamic pianist and composer Luke Benedict,
                  the guitar and piano duo brings music that is eclectic and
                  accessible to modern audiences.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Just months after playing together for the first time, the duo
                  embarked on a tour throughout the United States. Since then,
                  the Muse Duo has performed in various venues and festivals,
                  including the "Lynn New Music Festival", "Off the Dock Chamber
                  Festival", and the "Shellpoint Young Artist Series".
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  The Muse Duo strives to champion new compositions for the
                  unique ensemble. Their repertoire primarily consists of Luke's
                  original works, where he composes music tailored for the duo.
                  In July of 2022, the Duo traveled to New York to record their
                  debut album, entitled "Experiments". The album consists of
                  entirely original music, composed by Luke. These works are
                  melodically focused and neo-classically inspired, while
                  engaging audiences through its modernistic rhythmic drive.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  A dynamic modern ensemble, the Muse Duo fosters the spirit of
                  collaboration between themselves and like-minded musicians
                  with the intent to innovate. This includes the premiere
                  performances of Luke's original compositions in collaboration
                  with soprano, string quartet, guitar orchestra, and mixed
                  ensembles. This versatility of the Duo contributes to the
                  sentiment of chamber music in the purest and most modern
                  sense.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="font-normal text-gray-800 dark:text-gray-200"
                >
                  Through unique instrumentation, a convincing blend of musical
                  personalities, and music which is experimental and accessible,
                  the Muse Duo brings an exciting new perspective to chamber
                  music.
                </motion.p>
              </div>

              <motion.div
                className="mt-8 flex gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => {
                    document.querySelector('.concerts-section')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }}
                  className="btn-primary"
                >
                  View Concerts
                </button>
                <button
                  onClick={() => {
                    document.querySelector('.recordings-section')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    })
                  }}
                  className="btn-secondary"
                >
                  Listen to Music
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About