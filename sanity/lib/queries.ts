const groq = String.raw

export const heroQuery = groq`*[_type == "hero" && _id == "hero"][0]{
  logo,
  logoAlt,
  backgroundImage,
  backgroundAlt,
  ctaText,
  showCta,
  logoWidth,
  logoHeight,
  contentAlignment,
  overlayOpacity
}`

export const aboutQuery = groq`*[_type == "about" && _id == "about"][0]{
  title,
  subtitle,
  body,
  profileImage,
  profileImageAlt,
  artists
}`

export const contactQuery = groq`*[_type == "contact" && _id == "contact"][0]{
  title,
  subtitle,
  email,
  phone,
  management,
  social,
  contactImage
}`

export const concertsQuery = groq`*[_type == "concert"] | order(date desc){
  "slug": slug.current,
  title,
  date,
  timezone,
  venue,
  location,
  ticketUrl,
  moreInfoUrl,
  status,
  description
}`

export const recordingsQuery = groq`*[_type == "recording"] | order(order asc){
  "slug": slug.current,
  title,
  url,
  composer,
  description,
  dateRecorded,
  duration,
  thumbnail,
  order,
  featured,
  album,
  spotifyUrl,
  appleMusicUrl
}`

export const galleryQuery = groq`*[_type == "galleryImage"] | order(order asc){
  "_id": _id,
  image,
  alt,
  caption,
  order,
  dateTaken
}`

export const pressQuery = groq`*[_type == "pressArticle"] | order(order asc){
  "slug": slug.current,
  title,
  author,
  date,
  link,
  excerpt,
  image,
  order
}`

export const siteSettingsQuery = groq`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  title,
  description,
  url,
  seoImage,
  favicon,
  menuItems,
  showLogo,
  footerTitle,
  footerTagline,
  footerSocialLinks
}`
