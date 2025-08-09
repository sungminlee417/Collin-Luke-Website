'use client'

import { motion } from 'framer-motion'
import { usesReducedMotion } from '../lib/accessibility'

interface LoadingSkeletonProps {
  title: string
  className?: string
  rows?: number
  showImage?: boolean
}

export default function LoadingSkeleton({ 
  title, 
  className = "", 
  rows = 3, 
  showImage = true 
}: LoadingSkeletonProps) {
  const reducedMotion = usesReducedMotion()
  
  const shimmerAnimation = reducedMotion ? {} : {
    x: ['-100%', '100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop' as const,
        duration: 2,
        ease: 'linear'
      }
    }
  }

  const SkeletonBar = ({ width, height = 'h-4' }: { width: string, height?: string }) => (
    <div 
      className={`${height} ${width} bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden`}
      role="presentation"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-600/20 to-transparent"
        animate={shimmerAnimation}
      />
    </div>
  )

  return (
    <section 
      className={`section-padding ${className}`}
      aria-label={`Loading ${title} content`}
      role="region"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Title skeleton */}
          <div className="text-center mb-12">
            <SkeletonBar width="w-48 mx-auto" height="h-12" />
            <div className="mt-4">
              <SkeletonBar width="w-96 max-w-full mx-auto" />
            </div>
          </div>
          
          {/* Content skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              {Array.from({ length: rows }, (_, i) => (
                <SkeletonBar 
                  key={i}
                  width={i === rows - 1 ? 'w-4/6' : i === 1 ? 'w-5/6' : 'w-full'}
                />
              ))}
              
              {/* Button skeleton */}
              <div className="flex gap-4 mt-8">
                <SkeletonBar width="w-32" height="h-12" />
                <SkeletonBar width="w-28" height="h-12" />
              </div>
            </div>
            
            {showImage && (
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-2xl relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-gray-600/10 to-transparent"
                  animate={shimmerAnimation}
                />
              </div>
            )}
          </div>
        </motion.div>
        
        <div className="text-center mt-8">
          <p 
            className="text-sm text-gray-500 dark:text-gray-400"
            aria-live="polite"
            role="status"
          >
            Loading {title}...
          </p>
        </div>
      </div>
    </section>
  )
}