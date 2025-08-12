import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Simple markdown to HTML converter for basic formatting
function simpleMarkdownToHtml(markdown: string): string {
  return markdown
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Paragraphs
    .split('\n\n')
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph)
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('')
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'content/about/about.md')
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'About content not found' }, { status: 404 })
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    // Process markdown content to HTML
    const processedContent = content ? simpleMarkdownToHtml(content) : ''
    
    return NextResponse.json({
      ...data,
      content: processedContent
    })
  } catch (error) {
    console.error('Error reading about content:', error)
    return NextResponse.json({ error: 'Failed to load about content' }, { status: 500 })
  }
}