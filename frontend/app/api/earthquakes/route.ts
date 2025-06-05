import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('dataware_house')
    const earthquakes = await db
      .collection('earthquake_data')
      .find({})
      .toArray()

    return NextResponse.json(earthquakes)
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch earthquake data' },
      { status: 500 }
    )
  }
}
