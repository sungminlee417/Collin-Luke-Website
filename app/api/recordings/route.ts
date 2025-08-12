import { NextResponse } from 'next/server';
import { getRecordings } from '../../lib/content';

export async function GET() {
  try {
    const recordings = getRecordings();
    return NextResponse.json(recordings);
  } catch (error) {
    console.error('Error fetching recordings:', error);
    return NextResponse.json([], { status: 500 });
  }
}