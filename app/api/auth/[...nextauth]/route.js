import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Mock User Logic
                // In a real app, you would fetch from your database here.
                if (credentials?.email === "user@example.com" && credentials?.password === "password") {
                    return { id: "1", name: "Demo User", email: "user@example.com" };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET || 'secret', // Fallback for dev
});

export { handler as GET, handler as POST };
