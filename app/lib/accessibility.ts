'use client'

// Focus management utilities
export const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
    if (e.key === 'Escape') {
      element.focus()
    }
  }

  element.addEventListener('keydown', handleKeyDown)
  return () => element.removeEventListener('keydown', handleKeyDown)
}

// Keyboard navigation utilities
export const handleKeyboardNavigation = (
  event: KeyboardEvent,
  onEnter?: () => void,
  onSpace?: () => void,
  onEscape?: () => void,
  onArrowKeys?: (direction: 'up' | 'down' | 'left' | 'right') => void
) => {
  switch (event.key) {
    case 'Enter':
      if (onEnter) {
        event.preventDefault()
        onEnter()
      }
      break
    case ' ':
      if (onSpace) {
        event.preventDefault()
        onSpace()
      }
      break
    case 'Escape':
      if (onEscape) {
        event.preventDefault()
        onEscape()
      }
      break
    case 'ArrowUp':
      if (onArrowKeys) {
        event.preventDefault()
        onArrowKeys('up')
      }
      break
    case 'ArrowDown':
      if (onArrowKeys) {
        event.preventDefault()
        onArrowKeys('down')
      }
      break
    case 'ArrowLeft':
      if (onArrowKeys) {
        event.preventDefault()
        onArrowKeys('left')
      }
      break
    case 'ArrowRight':
      if (onArrowKeys) {
        event.preventDefault()
        onArrowKeys('right')
      }
      break
  }
}

// Screen reader announcements
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  if (typeof window === 'undefined') return

  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.setAttribute('class', 'sr-only')
  announcement.textContent = message

  document.body.appendChild(announcement)
  
  // Clean up after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// ARIA attributes helper
export const getAriaAttributes = (
  expanded?: boolean,
  controls?: string,
  describedBy?: string,
  labelledBy?: string,
  label?: string,
  role?: string,
  current?: boolean | 'page' | 'step' | 'location' | 'date' | 'time'
) => {
  const attrs: Record<string, any> = {}
  
  if (expanded !== undefined) attrs['aria-expanded'] = expanded
  if (controls) attrs['aria-controls'] = controls
  if (describedBy) attrs['aria-describedby'] = describedBy
  if (labelledBy) attrs['aria-labelledby'] = labelledBy
  if (label) attrs['aria-label'] = label
  if (role) attrs['role'] = role
  if (current !== undefined) attrs['aria-current'] = current
  
  return attrs
}

// Focus ring styles for custom components
export const focusRingClasses = 'focus:outline-none focus:ring-2 focus:ring-muse-red/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900'

// Reduced motion detection
export const usesReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Color contrast utilities
export const getContrastRatio = (color1: string, color2: string): number => {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd want a more robust color parsing library
  const getLuminance = (color: string): number => {
    // This is a simplified luminance calculation
    // You'd want to use a proper color library for production
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16) / 255
    const g = parseInt(hex.substr(2, 2), 16) / 255
    const b = parseInt(hex.substr(4, 2), 16) / 255
    
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
  }

  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  
  return (brightest + 0.05) / (darkest + 0.05)
}

// Touch-friendly minimum sizes
export const touchTargetClasses = 'min-h-[44px] min-w-[44px]'