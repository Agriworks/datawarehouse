import clientPromise from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('datawarehouse')
    const user = await db.collection('accounts').findOne({ Email: email })
    console.log(user)

    return NextResponse.json({
      email,
      role: user?.CSA_Role,
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
