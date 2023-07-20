import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import prisma from "../../../../prisma/client"

const handler = NextAuth({
    // adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await prisma.user.findUnique({
                where: {
                    email: session.user.email,
                },
            })
            session.user.id = sessionUser.id
            return session
        },
        async signIn({ account, profile, user, credentials }) {
            // console.log('profile', profile)
            try {
                const userExists = await prisma.user.findUnique({
                    where: {
                        email: profile.email,
                    },
                })
                if (!userExists) {
                    await prisma.user.create({
                        data: {
                            email: profile.email,
                            name: profile.name,
                            image: profile.picture,
                        },
                    })
                }
                return true
            } catch (error) {
                console.log("Error checking if user exists: ", error.message);
                return false
            }
        }
    },
})
export { handler as GET, handler as POST }
