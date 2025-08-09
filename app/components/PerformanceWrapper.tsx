'use client'

import { useEffect } from 'react'
import { registerServiceWorker, performanceObserver } from '../lib/serviceWorker'

interface PerformanceWrapperProps {
  children: React.ReactNode
}

export function PerformanceWrapper({ children }: PerformanceWrapperProps) {
  useEffect(() => {
    // Register service worker for caching
    registerServiceWorker()
    
    // Enable performance monitoring in development
    if (process.env.NODE_ENV === 'development') {
      performanceObserver()
    }
    
    // Report Web Vitals
    if (typeof window !== 'undefined') {
      // Core Web Vitals reporting
      const reportWebVitals = (metric: any) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`${metric.name}: ${metric.value}`)
        }
      }
      
      // Dynamic import to avoid bundling in production
      import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
        onCLS(reportWebVitals)
        onFID(reportWebVitals)
        onFCP(reportWebVitals)
        onLCP(reportWebVitals)
        onTTFB(reportWebVitals)
      }).catch(() => {
        // Gracefully handle if web-vitals is not available
      })
    }
  }, [])

  return <>{children}</>
}