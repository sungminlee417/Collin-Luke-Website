import { NextResponse } from 'next/server';
import { getConcerts } from '../../lib/content';

export async function GET() {
  try {
    const concerts = getConcerts();
    return NextResponse.json(concerts);
  } catch (error) {
    console.error('Error fetching concerts:', error);
    return NextResponse.json([], { status: 500 });
  }
}