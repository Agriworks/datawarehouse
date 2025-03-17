import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export default async function POST(request: Request) {
  try {
    const { email } = await request.json()
    console.log('Received email:', email)

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('datawarehouse')
    const user = await db.collection('accounts').findOne({ email })

    return NextResponse.json({
      email,
      role: user?.role || 'user',
      exists: !!user,
    })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
