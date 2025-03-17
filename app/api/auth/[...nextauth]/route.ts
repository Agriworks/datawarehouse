import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'
import clientPromise from '@/lib/mongodb'

// Create auth options without exporting
const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const client = await clientPromise
        const db = client.db('datawarehouse')
        const dbUser = await db.collection('accounts').findOne({
          Email: user.email,
        })
        return !!dbUser?.CSA_Role
      } catch (error) {
        console.error('Sign in error:', error)
        return false
      }
    },
    async jwt({ token, user, account }) {
      if (account && user?.email) {
        try {
          const client = await clientPromise
          const db = client.db('datawarehouse')
          const dbUser = await db.collection('accounts').findOne({
            Email: user.email,
          })
          token.role = dbUser?.CSA_Role || null
          console.log('Role assigned:', token.role)
        } catch (error) {
          console.error('JWT error:', error)
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      }
    },
  },
  pages: {
    signIn: '/landingpage',
    error: '/landingpage',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(options)
export { handler as GET, handler as POST }
