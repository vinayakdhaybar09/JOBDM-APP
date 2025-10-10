import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // For demo purposes, we'll use hardcoded credentials
        // In production, this would check against a database
        if (credentials?.email === "demo@gmail.com" && credentials?.password === "demo@gmail.com") {
          return {
            id: "1",
            email: "demo@gmail.com",
            name: "Demo User",
            image: null,
          }
        }
        
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id?: string }).id = token.id as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
})

export { handler as GET, handler as POST }
