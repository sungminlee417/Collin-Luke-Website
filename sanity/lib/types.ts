import type { Image, PortableTextBlock } from 'sanity'

export interface HeroData {
  logo?: Image
  logoAlt?: string
  backgroundImage: Image
  backgroundAlt?: string
  ctaText?: string
  showCta?: boolean
}

export interface Artist {
  name: string
  instrument: string
}

export interface AboutData {
  title: string
  subtitle?: string
  body: PortableTextBlock[]
  profileImage?: Image
  profileImageAlt?: string
  artists?: Artist[]
}

export interface ContactData {
  title: string
  subtitle?: string
  email: string
  phone?: string
  management?: { name?: string; email?: string }
  social?: {
    instagram?: string
    youtube?: string
    facebook?: string
    spotify?: string
    appleMusic?: string
  }
  contactImage?: Image
}

export interface Concert {
  slug: string
  title: string
  date: string
  timezone?: string | null
  venue: string
  location: string
  ticketUrl?: string
  moreInfoUrl?: string
  status: 'upcoming' | 'past'
  description?: string
}

export interface Recording {
  slug: string
  title: string
  url: string
  composer?: string
  duration?: string
  order: number
}

export interface GalleryImage {
  _id: string
  image: Image
  alt: string
  caption?: string
  order: number
  dateTaken?: string
}

export interface PressArticle {
  slug: string
  title: string
  author?: string
  date?: string
  link: string
  excerpt?: string
  image?: Image
  order: number
}

export interface MenuItem {
  label: string
  section: string
  order: number
}

export interface SocialLink {
  name: string
  href: string
  order: number
}

export type CampaignPlacement = 'concerts' | 'recordings' | 'gallery' | 'press'

export interface Campaign {
  slug: string
  title: string
  description?: string
  url: string
  buttonLabel?: string
  placement: CampaignPlacement
  active: boolean
  order: number
}

export interface SiteSettings {
  title: string
  description?: string
  url?: string
  seoImage?: Image
  favicon?: Image
  menuItems?: MenuItem[]
  showLogo?: boolean
  footerTitle?: string
  footerTagline?: string
  footerSocialLinks?: SocialLink[]
}
