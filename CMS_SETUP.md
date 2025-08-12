# Decap CMS Setup for The Muse Duo

## Overview
A comprehensive content management system has been set up for each section of The Muse Duo website using Decap CMS (formerly Netlify CMS).

## CMS Collections

### 1. Hero Section
**File:** `content/hero/hero.md`
**API:** `/api/hero`
- Logo Image
- Background Image
- Alt Text for accessibility

### 2. About Section
**File:** `content/about/about.md`
**API:** `/api/about`
- Title & Subtitle
- Main content (Markdown)
- Profile image
- Featured artists list
- Alt text for images

### 3. Concerts
**Folder:** `content/concerts/`
**API:** `/api/concerts`
- Enhanced concert information
- Program details
- Ticket information
- Featured concerts
- Status (upcoming/past)

### 4. Music & Recordings
**Folder:** `content/recordings/`
**API:** `/api/recordings`
- Multiple streaming platform URLs
- Composer information
- Album grouping
- Featured recordings
- Thumbnails

### 5. Photo Gallery
**Folder:** `content/gallery/`
**API:** Available (existing)
- Enhanced metadata
- Categories (performance, portrait, etc.)
- Photographer credits
- Featured images

### 6. Press & Reviews
**Folder:** `content/press/`
**API:** Available (existing)
- Article types (review, interview, etc.)
- Author information
- Full article content
- Featured articles

### 7. Contact Section
**File:** `content/contact/contact.md`
**API:** `/api/contact`
- Multiple contact methods
- Management contact
- Social media links
- Booking-specific email

### 8. Site Settings
**Files:** `content/settings/`
**API:** `/api/settings?type=<type>`
- Site information
- Navigation configuration
- Footer settings

## Accessing the CMS

1. **Admin Panel:** Visit `/admin` on your live site
2. **Authentication:** Uses Git Gateway (GitHub authentication)
3. **Editorial Workflow:** Enabled for content review before publishing

## API Endpoints

All content is accessible via API routes:
- `/api/hero` - Hero section content
- `/api/about` - About section content
- `/api/concerts` - All concerts
- `/api/recordings` - All recordings
- `/api/contact` - Contact information
- `/api/settings?type=site` - Site settings
- `/api/settings?type=navigation` - Navigation settings
- `/api/settings?type=footer` - Footer settings

## Features

- **Editorial Workflow:** Draft → Review → Publish
- **Image Management:** Upload and manage images
- **Rich Text Editing:** Markdown support for content
- **Sortable Collections:** Order content by date, title, etc.
- **Featured Content:** Mark items as featured
- **SEO-Friendly:** Proper metadata handling
- **Responsive:** Admin interface works on all devices

## Next Steps

1. Deploy to production
2. Configure Git Gateway on Netlify/hosting platform
3. Set up user access for content editors
4. Update components to use CMS data
5. Test editorial workflow

## Content Structure

All content files use frontmatter for metadata and Markdown for rich content. The CMS provides a user-friendly interface while maintaining the flexibility of file-based content management.