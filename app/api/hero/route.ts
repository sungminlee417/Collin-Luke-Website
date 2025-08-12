import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'content/hero/hero.md')
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Hero content not found' }, { status: 404 })
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading hero content:', error)
    return NextResponse.json({ error: 'Failed to load hero content' }, { status: 500 })
  }
}