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
  campaignsQuery,
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
  Campaign,
} from './types'

// The Sanity webhook (-> /api/revalidate) invalidates Next's page cache on
// every publish. This one-hour fallback only kicks in if the webhook fails.
const REVALIDATE = 3600

const fetchOptions = { next: { revalidate: REVALIDATE } }

export const getHero = () => client.fetch<HeroData | null>(heroQuery, {}, fetchOptions)
export const getAbout = () => client.fetch<AboutData | null>(aboutQuery, {}, fetchOptions)
export const getContact = () => client.fetch<ContactData | null>(contactQuery, {}, fetchOptions)
export const getConcerts = () => client.fetch<Concert[]>(concertsQuery, {}, fetchOptions)
export const getRecordings = () => client.fetch<Recording[]>(recordingsQuery, {}, fetchOptions)
export const getGallery = () => client.fetch<GalleryImage[]>(galleryQuery, {}, fetchOptions)
export const getPress = () => client.fetch<PressArticle[]>(pressQuery, {}, fetchOptions)
export const getSiteSettings = () =>
  client.fetch<SiteSettings | null>(siteSettingsQuery, {}, fetchOptions)
export const getCampaigns = () =>
  client.fetch<Campaign[]>(campaignsQuery, {}, fetchOptions)
