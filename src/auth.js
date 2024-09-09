import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db"; // Drizzle ORM database instance
import { users } from "@/db/schema/users"; // Drizzle ORM users schema
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

// Function to fetch user by email from Drizzle DB
async function getUserByEmail(email) {
  const user = await db.select().from(users).where(eq(users.email, email));
  return user;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          // Fetch the user by email from the database
          const user = await getUserByEmail(credentials.email);
          // If user is not found, return null (login failure)
          if (!user) {
            console.error("No user found with this email.");
            return null;
          }
          // Compare the input password with the stored hashed password
          const isPasswordValid = await bcrypt.compare(
            String(credentials.password),
            String(user[0].passwordHash),
          );
          // If the password is invalid, return null (login failure)
          if (!isPasswordValid) {
            console.error("Invalid password.");
            return null;
          }
          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // If something goes wrong, return null (login failure)
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});
