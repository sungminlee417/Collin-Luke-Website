import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'content/contact/contact.md')
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Contact content not found' }, { status: 404 })
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return NextResponse.json({
      ...data,
      content
    })
  } catch (error) {
    console.error('Error reading contact content:', error)
    return NextResponse.json({ error: 'Failed to load contact content' }, { status: 500 })
  }
}