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

const REVALIDATE = 60 // fallback; the Netlify build hook (fired by Sanity) triggers a full rebuild on edits

async function sanityFetch<T>(query: string): Promise<T> {
  return client.fetch<T>(query, {}, { next: { revalidate: REVALIDATE } })
}

export const getHero = () => sanityFetch<HeroData | null>(heroQuery)
export const getAbout = () => sanityFetch<AboutData | null>(aboutQuery)
export const getContact = () => sanityFetch<ContactData | null>(contactQuery)
export const getConcerts = () => sanityFetch<Concert[]>(concertsQuery)
export const getRecordings = () => sanityFetch<Recording[]>(recordingsQuery)
export const getGallery = () => sanityFetch<GalleryImage[]>(galleryQuery)
export const getPress = () => sanityFetch<PressArticle[]>(pressQuery)
export const getSiteSettings = () => sanityFetch<SiteSettings | null>(siteSettingsQuery)
