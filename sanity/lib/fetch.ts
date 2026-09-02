import { client } from './client'
import {
  heroQuery,
  aboutQuery,
  contactQuery,
  concertsQuery,
  recordingsQuery,
  galleryQuery,
  pressQuery,
  siteSettingsQuery,
} from './queries'
import type {
  HeroData,
  AboutData,
  ContactData,
  Concert,
  Recording,
  GalleryImage,
  PressArticle,
  SiteSettings,
} from './types'

// Long fallback — Sanity webhook -> /api/revalidate handles real-time freshness
// via revalidateTag(). This value only kicks in if the webhook fails.
const REVALIDATE = 3600

async function sanityFetch<T>(query: string, tags: string[]): Promise<T> {
  return client.fetch<T>(query, {}, { next: { revalidate: REVALIDATE, tags } })
}

export const getHero = () => sanityFetch<HeroData | null>(heroQuery, ['hero'])
export const getAbout = () => sanityFetch<AboutData | null>(aboutQuery, ['about'])
export const getContact = () => sanityFetch<ContactData | null>(contactQuery, ['contact'])
export const getConcerts = () => sanityFetch<Concert[]>(concertsQuery, ['concert'])
export const getRecordings = () => sanityFetch<Recording[]>(recordingsQuery, ['recording'])
export const getGallery = () => sanityFetch<GalleryImage[]>(galleryQuery, ['galleryImage'])
export const getPress = () => sanityFetch<PressArticle[]>(pressQuery, ['pressArticle'])
export const getSiteSettings = () =>
  sanityFetch<SiteSettings | null>(siteSettingsQuery, ['siteSettings'])
