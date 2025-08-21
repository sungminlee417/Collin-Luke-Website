import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), 'content', 'gallery')
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(galleryDir)) {
      fs.mkdirSync(galleryDir, { recursive: true })
    }

    const files = fs.readdirSync(galleryDir).filter(file => file.endsWith('.md'))
    
    let images = []
    
    for (const file of files) {
      const filePath = path.join(galleryDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      
      images.push({
        slug: path.basename(file, '.md'),
        url: data.url || '',
        alt: data.alt || '',
        caption: data.caption || '',
        order: data.order || 0
      })
    }
    
    // Sort images by order
    images.sort((a, b) => a.order - b.order)
    
    const galleryData = {
      title: 'Gallery',
      instagramUrl: 'https://www.instagram.com/muse__duo/',
      instagramHandle: '@muse__duo',
      images
    }
    
    return NextResponse.json(galleryData)
  } catch (error) {
    console.error('Error loading gallery data:', error)
    
    // Return fallback data
    return NextResponse.json({
      title: 'Gallery',
      instagramUrl: 'https://www.instagram.com/muse__duo/',
      instagramHandle: '@muse__duo',
      images: [
        {
          url: "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-1.jpeg",
          alt: "Gallery image 1",
          order: 1,
          slug: "gallery-1"
        },
        {
          url: "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-7.jpeg",
          alt: "Gallery image 7",
          order: 2,
          slug: "gallery-7"
        },
        {
          url: "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-8.jpeg",
          alt: "Gallery image 8",
          order: 3,
          slug: "gallery-8"
        },
        {
          url: "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-11.jpeg",
          alt: "Gallery image 11",
          order: 4,
          slug: "gallery-11"
        },
        {
          url: "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-14.jpg",
          alt: "Gallery image 14",
          order: 5,
          slug: "gallery-14"
        },
        {
          url: "https://the-muse-duo.s3.us-west-1.amazonaws.com/muse-duo-gallery-15.jpg",
          alt: "Gallery image 15",
          order: 6,
          slug: "gallery-15"
        }
      ]
    })
  }
}