import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import { NextAuthOptions } from 'next-auth';
import { firestore } from '@/config/firestore';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	useSecureCookies: process.env.NODE_ENV === 'production',
	callbacks: {
		session({ session, token }) {
			session.user.uid = token.sub as string;
			return session;
		},
	},
	adapter: FirestoreAdapter(firestore),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	pages: {
		signIn: '/auth/signin',
	},

	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
