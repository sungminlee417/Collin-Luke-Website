import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const pressDir = path.join(process.cwd(), 'content', 'press')
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(pressDir)) {
      fs.mkdirSync(pressDir, { recursive: true })
    }

    const files = fs.readdirSync(pressDir).filter(file => file.endsWith('.md'))
    
    let articles = []
    
    for (const file of files) {
      const filePath = path.join(pressDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)
      
      articles.push({
        slug: path.basename(file, '.md'),
        title: data.title || '',
        author: data.author || '',
        date: data.date || '',
        image: data.image || '',
        link: data.link || '',
        excerpt: data.excerpt || '',
        order: data.order || 0
      })
    }
    
    // Sort articles by order
    articles.sort((a, b) => a.order - b.order)
    
    const pressData = {
      title: 'Press',
      subtitle: 'Read what critics and journalists are saying about The Muse Duo',
      articles
    }
    
    return NextResponse.json(pressData)
  } catch (error) {
    console.error('Error loading press data:', error)
    
    // Return fallback data
    return NextResponse.json({
      title: 'Press',
      subtitle: 'Read what critics and journalists are saying about The Muse Duo',
      articles: [
        {
          author: 'Nancy E. McCarthy',
          date: 'May 2, 2025',
          image: '/images/IMG_0017.JPG',
          link: 'https://www.lifeinthefingerlakes.com/two-of-a-kind-the-muse-duo/',
          title: 'Two of a Kind: The Muse Duo',
          excerpt: 'An in-depth look at the unique musical partnership and innovative performances of The Muse Duo.',
          slug: 'two-of-a-kind'
        }
      ]
    })
  }
}