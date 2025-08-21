import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'site'
    
    const settingsDir = path.join(process.cwd(), 'content', 'settings')
    
    // Default navigation sections
    const defaultSections = [
      { label: 'About', section: 'about', order: 1 },
      { label: 'Concerts', section: 'concerts', order: 2 },
      { label: 'Music', section: 'recordings', order: 3 },
      { label: 'Gallery', section: 'photos', order: 4 },
      { label: 'Press', section: 'press', order: 5 },
      { label: 'Contact', section: 'contact', order: 6 },
    ]
    
    if (type === 'navigation') {
      // Read navigation settings
      const navigationPath = path.join(settingsDir, 'navigation.md')
      if (fs.existsSync(navigationPath)) {
        const fileContent = fs.readFileSync(navigationPath, 'utf8')
        const { data } = matter(fileContent)
        return NextResponse.json({
          menuItems: data.menuItems || defaultSections,
          showLogo: data.showLogo || false
        })
      }
      
      return NextResponse.json({
        menuItems: defaultSections,
        showLogo: false
      })
    } else if (type === 'footer') {
      // Read footer settings
      const footerPath = path.join(settingsDir, 'footer.md')
      if (fs.existsSync(footerPath)) {
        const fileContent = fs.readFileSync(footerPath, 'utf8')
        const { data } = matter(fileContent)
        return NextResponse.json({
          title: data.title || 'The Muse Duo',
          tagline: data.tagline || 'Classical music reimagined for modern audiences',
          logo: data.logo || '/images/icon.png',
          socialLinks: data.socialLinks || [
            { name: 'YouTube', href: 'https://www.youtube.com/@TheMuseDuo', order: 1 },
            { name: 'Instagram', href: 'https://www.instagram.com/muse__duo/', order: 2 }
          ]
        })
      }
      
      return NextResponse.json({
        title: 'The Muse Duo',
        tagline: 'Classical music reimagined for modern audiences',
        logo: '/images/icon.png',
        socialLinks: [
          { name: 'YouTube', href: 'https://www.youtube.com/@TheMuseDuo', order: 1 },
          { name: 'Instagram', href: 'https://www.instagram.com/muse__duo/', order: 2 }
        ]
      })
    } else {
      // Default settings handling for other types
      const filePath = path.join(settingsDir, `${type}.md`)
      
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: `Settings file for ${type} not found` }, { status: 404 })
      }

      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      return NextResponse.json({
        ...data,
        content
      })
    }
  } catch (error) {
    console.error('Error reading settings:', error)
    return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 })
  }
}