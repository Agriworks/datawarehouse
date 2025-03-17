import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'
import clientPromise from '@/lib/mongodb'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/landingpage',
    error: '/landingpage',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user?.email) {
        // Add this check
        try {
          const client = await clientPromise
          const db = client.db('datawarehouse')
          const dbUser = await db.collection('accounts').findOne({
            email: user.email,
          })
          token.role = dbUser?.role
          console.log('Found role from MongoDB:', token.role)
        } catch (error) {
          console.error('MongoDB connection error:', error)
          token.role = 'user' // fallback role
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          role: token.role,
        },
      }
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
