'use client'

import React from 'react'
import Image from 'next/image'
import { urlForImage, sanityLoader } from '../../sanity/lib/image'
import type { PressArticle } from '../../sanity/lib/types'
import { useInView } from '../lib/useInView'

interface PressProps {
  articles: PressArticle[]
}

const Press = ({ articles }: PressProps) => {
  return (
    <section className="press-section section section-white">
      <div className="section-inner">
        <div className="mb-12 md:mb-16 max-w-3xl">
          <div className="eyebrow mb-6">Press</div>
          <h2 className="display-section">Reviews</h2>
        </div>

        {articles.length === 0 ? (
          <div className="py-16 border-t border-neutral-200 dark:border-neutral-800 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              Press features will appear here.
            </p>
          </div>
        ) : (
          <ul className="space-y-16 md:space-y-24">
            {articles.map((article, i) => (
              <PressItem key={article.slug || i} article={article} index={i} />
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

function PressItem({ article, index }: { article: PressArticle; index: number }) {
  const { ref, inView } = useInView<HTMLLIElement>()
  const imageUrl = article.image ? urlForImage(article.image).url() : null
  const reverse = index % 2 === 1

  return (
    <li
      ref={ref}
      className={`grid grid-cols-12 gap-6 md:gap-10 lg:gap-14 items-center transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Image */}
      {imageUrl && (
        <div
          className={`col-span-12 md:col-span-5 ${
            reverse ? 'md:col-start-8 md:row-start-1' : ''
          }`}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src={imageUrl}
              alt={article.title}
              fill
              loader={sanityLoader}
              quality={78}
              loading="lazy"
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      )}

      {/* Editorial content */}
      <div
        className={`col-span-12 md:col-span-7 ${
          reverse ? 'md:col-start-1 md:row-start-1' : ''
        } ${imageUrl ? '' : 'md:col-span-12'}`}
      >
        <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-neutral-500 dark:text-neutral-400 mb-6">
          <span className="w-8 h-px bg-neutral-300 dark:bg-neutral-700" />
          {article.date && <span>{article.date}</span>}
          {article.date && article.author && <span className="text-neutral-300 dark:text-neutral-700">·</span>}
          {article.author && <span>{article.author}</span>}
        </div>

        <h3 className="font-display font-light text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-neutral-900 dark:text-neutral-50 mb-6">
          {article.title}
        </h3>

        {article.excerpt && (
          <blockquote className="border-l-2 border-muse-red pl-6 mb-8 text-lg md:text-xl italic font-light text-neutral-700 dark:text-neutral-300 leading-relaxed">
            &ldquo;{article.excerpt}&rdquo;
          </blockquote>
        )}

        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-400
                     hover:gap-3 transition-all duration-200"
        >
          Read the full article
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </li>
  )
}

export default Press
