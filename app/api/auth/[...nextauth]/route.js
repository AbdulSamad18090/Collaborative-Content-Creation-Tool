import dbConnect from "@/lib/DbConnection/connection";
import User from "@/lib/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "signup",
      name: "signup",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          const existingUser = await User.findOne({ email: credentials.email });

          if (existingUser) {
            throw new Error("User already exists. Please log in.");
          }

          // Hash the password
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          // Create a new user
          const newUser = new User({
            name: credentials.name,
            email: credentials.email,
            password: hashedPassword,
            isGoogleLogin: false,
            isAdmin: true, // default to false
          });

          await newUser.save();
          return newUser;
        } catch (error) {
          throw new Error("Signup failed. " + error.message);
        }
      },
    }),
    CredentialsProvider({
      id: "login",
      name: "login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await dbConnect();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this email.");
          }

          // Check if the password is correct
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid email or password.");
          }

          return user;
        } catch (error) {
          throw new Error("Login failed. " + error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day session expiration
    updateAge: 60 * 60, // JWT is updated every hour
  },

  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      try {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email });

        if (account.provider === "google") {
          if (existingUser) {
            if (existingUser.isAdmin) {
              // Update existing user's name and image if Google sign-in provides updated info
              existingUser.name = user.name || existingUser.name;
              existingUser.image = user.image || existingUser.image;
              await existingUser.save();
              return true;
            }
          } else {
            // Create a new user if not found
            const newUser = new User({
              name: user.name,
              email: user.email,
              image: user.image,
              isGoogleLogin: true,
              isAdmin: true, // Set isAdmin to false initially
            });
            await newUser.save();
            return true;
          }
        } else if (
          account.provider === "login" ||
          account.provider === "signup"
        ) {
          // Handle the sign-in with credentials provider (signup/login)
          if (!existingUser) {
            throw new Error("No user found with this email.");
          }

          if (credentials && credentials.password) {
            // Check password validity for manual login
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              existingUser.password
            );
            if (!isPasswordValid) {
              throw new Error("Invalid email or password.");
            }
          }

          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("SignIn Error =>", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      // First time JWT callback is called, `user` will be available, subsequent times only `token`
      if (user) {
        token.id = user.id;
      }

      // Fetch user data from the database to attach it to the token
      await dbConnect();
      const dbUser = await User.findOne({ email: token.email });

      if (dbUser) {
        token.id = dbUser._id;
        token.name = dbUser.name;
        token.email = dbUser.email;
        token.image = dbUser.image;
        token.isAdmin = dbUser.isAdmin;
      }

      return token;
    },

    async session({ session, token }) {
      // Attach full user data from token to session
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.isAdmin = token.isAdmin;

      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    signOut: "/auth/signout", // Custom sign-out page
    error: "/auth/error", // Error page
    verifyRequest: "/auth/verify-request", // Email verification page
    newUser: null, // Disable the new account creation screen
  },
  debug: process.env.NODE_ENV === "development", // Enable debug messages in development
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
