import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // You can add more providers here if needed
  ],
  session: {
    strategy: "jwt", // Use JSON Web Tokens for sessions
    maxAge: 24 * 60 * 60, // Session max age in seconds (1 day)
    updateAge: 30 * 60, // How often to update the session (in seconds)
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // If user is logged in, add user info to token
      if (user) {
        token.id = user.id; // You can add more user properties to the token as needed
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Include token properties in session object
      session.user.id = token.id; // If you added `id` to the token
      session.user.email = token.email; // If you added `email` to the token
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    signOut: '/auth/signout', // Custom sign-out page
    error: '/auth/error', // Error page
    verifyRequest: '/auth/verify-request', // Email verification page
    newUser: null, // Will disable the new account creation screen
  },
  debug: process.env.NODE_ENV === 'development', // Enable debug messages in development
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
