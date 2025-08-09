import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export interface Concert {
  title: string
  date: string
  venue: string
  location: string
  time?: string
  ticketUrl?: string
  status: 'upcoming' | 'past'
  featuredImage?: string
  description?: string
  slug: string
}

export interface GalleryImage {
  title: string
  image: string
  caption?: string
  dateTaken?: string
  order: number
  slug: string
}

export interface Recording {
  title: string
  url: string
  description?: string
  dateRecorded?: string
  order: number
  slug: string
}

export interface PressItem {
  title: string
  publication: string
  date: string
  url?: string
  excerpt?: string
  image?: string
  slug: string
}

export interface About {
  title: string
  content: string
  profileImage?: string
}

export interface Contact {
  title: string
  email: string
  phone?: string
  social: {
    instagram?: string
    youtube?: string
    facebook?: string
  }
  contactImage?: string
}

export function getConcerts(): Concert[] {
  const concertsDirectory = path.join(contentDirectory, 'concerts')
  
  if (!fs.existsSync(concertsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(concertsDirectory)
  const concerts = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(concertsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return {
        ...data,
        description: content,
        slug: name.replace('.md', ''),
      } as Concert
    })

  // Sort by date, upcoming first
  return concerts.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
}

export function getGalleryImages(): GalleryImage[] {
  const galleryDirectory = path.join(contentDirectory, 'gallery')
  
  if (!fs.existsSync(galleryDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(galleryDirectory)
  const images = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(galleryDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        ...data,
        slug: name.replace('.md', ''),
      } as GalleryImage
    })

  // Sort by order, then by date
  return images.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order
    }
    if (a.dateTaken && b.dateTaken) {
      return new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime()
    }
    return 0
  })
}

export function getRecordings(): Recording[] {
  const recordingsDirectory = path.join(contentDirectory, 'recordings')
  
  if (!fs.existsSync(recordingsDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(recordingsDirectory)
  const recordings = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(recordingsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        ...data,
        slug: name.replace('.md', ''),
      } as Recording
    })

  // Sort by order, then by date
  return recordings.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order
    }
    if (a.dateRecorded && b.dateRecorded) {
      return new Date(b.dateRecorded).getTime() - new Date(a.dateRecorded).getTime()
    }
    return 0
  })
}

export function getPressItems(): PressItem[] {
  const pressDirectory = path.join(contentDirectory, 'press')
  
  if (!fs.existsSync(pressDirectory)) {
    return []
  }

  const filenames = fs.readdirSync(pressDirectory)
  const pressItems = filenames
    .filter(name => name.endsWith('.md'))
    .map(name => {
      const fullPath = path.join(pressDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        ...data,
        slug: name.replace('.md', ''),
      } as PressItem
    })

  // Sort by date, newest first
  return pressItems.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

export function getAbout(): About {
  const aboutPath = path.join(contentDirectory, 'settings', 'about.md')
  
  if (!fs.existsSync(aboutPath)) {
    return {
      title: 'About',
      content: 'Content coming soon...'
    }
  }

  const fileContents = fs.readFileSync(aboutPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    title: data.title || 'About',
    content,
    profileImage: data.profileImage
  }
}

export function getContact(): Contact {
  const contactPath = path.join(contentDirectory, 'settings', 'contact.md')
  
  if (!fs.existsSync(contactPath)) {
    return {
      title: 'Contact',
      email: 'hello@themuseduo.com',
      social: {}
    }
  }

  const fileContents = fs.readFileSync(contactPath, 'utf8')
  const { data } = matter(fileContents)
  
  return {
    title: data.title || 'Contact',
    email: data.email || 'hello@themuseduo.com',
    phone: data.phone,
    social: data.social || {},
    contactImage: data.contactImage
  }
}