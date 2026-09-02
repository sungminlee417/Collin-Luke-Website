import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Sanity fires this endpoint whenever a document is published, updated, or deleted.
//
// Configure the webhook at https://sanity.io/manage/project/<id>/api → Webhooks:
//   URL:        https://<your-domain>/api/revalidate
//   Trigger on: Create, Update, Delete
//   Filter:     !(_id in path("drafts.**")) && _type in ["hero","about","contact","concert","recording","galleryImage","pressArticle","siteSettings"]
//   Projection: {_type}
//   Secret:     value of SANITY_REVALIDATE_SECRET (same secret in Netlify env vars)

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 })
    }
    if (!body?._type) {
      return NextResponse.json({ message: 'Missing _type in body' }, { status: 400 })
    }

    revalidateTag(body._type)
    return NextResponse.json({ revalidated: true, tag: body._type, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message }, { status: 500 })
  }
}
