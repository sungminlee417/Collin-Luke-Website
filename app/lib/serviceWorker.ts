'use client'

// Service Worker Registration
export const registerServiceWorker = () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        });
        
        console.log('SW registered: ', registration);
        
        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available
                if (confirm('New version available. Refresh to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
        
      } catch (error) {
        console.log('SW registration failed: ', error);
      }
    });
  }
};

// Performance monitoring utilities
export const performanceObserver = () => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    // Observe Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
          console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
        }
      }
    });
    
    observer.observe({ entryTypes: ['measure', 'navigation'] });
    
    // Measure page load performance
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const pageLoadTime = perfData.loadEventEnd - perfData.loadEventStart;
      const domContentLoadTime = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
      
      console.log(`Page Load Time: ${pageLoadTime}ms`);
      console.log(`DOM Content Load Time: ${domContentLoadTime}ms`);
    });
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    const preloadLink = (href: string, as: string, type?: string) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };
    
    // Preload hero image
    preloadLink('/images/IMG_4655.jpeg', 'image');
    
    // Preload critical font
    preloadLink('/fonts/Candu-Condensed.otf', 'font', 'font/otf');
  }
};

// Intersection Observer for lazy loading optimization
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    return new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options
    });
  }
  return null;
};