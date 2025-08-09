'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Article {
  author: string
  date: string
  image: string
  link: string
  title: string
  excerpt?: string
}

const articles: Article[] = [
  {
    author: 'Nancy E. McCarthy',
    date: 'May 2, 2025',
    image: '/images/IMG_0017.JPG',
    link: 'https://www.lifeinthefingerlakes.com/two-of-a-kind-the-muse-duo/',
    title: 'Two of a Kind: The Muse Duo',
    excerpt: 'An in-depth look at the unique musical partnership and innovative performances of The Muse Duo.',
  },
]

const Press = () => {
  return (
    <section className="press-section bg-white">
      <div className="container-custom section-padding">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-2 text-muse-red mb-4">Press</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Read what critics and journalists are saying about The Muse Duo
          </p>
        </motion.div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {articles.map((article, index) => (
            <motion.article
              key={index}
              className="card-modern overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
                  </div>
                </div>

                <div className="md:col-span-2 p-6 md:p-8">
                  <div className="mb-4">
                    <time className="text-sm text-muse-gray uppercase tracking-wider font-medium">
                      {article.date}
                    </time>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-normal text-gray-900 mb-2 group-hover:text-muse-red transition-colors duration-300">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    by <span className="font-normal text-gray-800">{article.author}</span>
                  </p>

                  {article.excerpt && (
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}

                  <motion.a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muse-red font-medium 
                             hover:gap-3 transition-all duration-300"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Full Article
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {articles.length > 3 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <button className="btn-secondary">
              View All Press Articles
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Press