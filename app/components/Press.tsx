'use client'

import React from 'react'
import Image from 'next/image'
import { urlForImage } from '../../sanity/lib/image'
import type { PressArticle } from '../../sanity/lib/types'
import { useInView } from '../lib/useInView'

interface PressProps {
  articles: PressArticle[]
}

const Press = ({ articles }: PressProps) => {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="press-section bg-white dark:bg-gray-900">
      <div className="container-custom section-padding">
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="heading-2 text-muse-red dark:text-red-400 mb-4">Press</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Read what critics and journalists are saying about The Muse Duo
          </p>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {articles.map((article, index) => {
            const imageUrl = article.image
              ? urlForImage(article.image).width(800).quality(80).url()
              : null

            return (
              <PressCard
                key={article.slug || index}
                article={article}
                imageUrl={imageUrl}
                delayMs={index * 100}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function PressCard({
  article,
  imageUrl,
  delayMs,
}: {
  article: PressArticle
  imageUrl: string | null
  delayMs: number
}) {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <article
      ref={ref}
      className={`card-modern overflow-hidden group transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="relative h-64 md:h-full overflow-hidden">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={article.title}
                fill
                loading="lazy"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
          </div>
        </div>

        <div className="md:col-span-2 p-6 md:p-8">
          <div className="mb-4">
            <time className="text-sm text-muse-gray uppercase tracking-wider font-medium">
              {article.date}
            </time>
          </div>

          <h3 className="text-2xl md:text-3xl font-normal text-gray-900 dark:text-gray-100 mb-2 group-hover:text-muse-red dark:group-hover:text-red-400 transition-colors duration-300">
            {article.title}
          </h3>

          {article.author && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              by{' '}
              <span className="font-normal text-gray-800 dark:text-gray-200">
                {article.author}
              </span>
            </p>
          )}

          {article.excerpt && (
            <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
              {article.excerpt}
            </p>
          )}

          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muse-red dark:text-red-400 font-medium
                       hover:gap-3 hover:translate-x-1 transition-all duration-300 active:scale-95"
          >
            Read Full Article
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  )
}

export default Press
