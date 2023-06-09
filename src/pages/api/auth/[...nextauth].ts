import { db } from '@/config/firebase';
import { urlNormalize } from '@/utils/urlNormalize';
import { setDoc, doc } from 'firebase/firestore';
import NextAuth, { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			profile(profile: any) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture,
				};
			},
			encoding: 'base64',

			client: {
				client_id: process.env.GOOGLE_CLIENT_ID,
				client_secret: process.env.GOOGLE_CLIENT_SECRET,
			},
		}),
	],
	callbacks: {
		async session({ session, token }: { session: any; token: JWT }) {
			if (session && session.user) {
				session.user.uid = token.sub as string;
			}
			return session;
		},

		async signIn({ user }) {
			const res = await fetch('http://localhost:3000/api/encrypt', {
				method: 'POST',
				body: JSON.stringify({
					uid: user.id,
				}),
			});
			const data = await res.json();

			await setDoc(
				doc(db, 'users', `${user?.id}`),
				{
					name: user.name,
					email: user.email,
					image: user.image,
					uid: data.hash,
					createdAt: Date.now(),
				},
				{
					merge: true,
				}
			);
			return true;
		},
		async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
			const reg = / @"[^-A-Za-z0-9+&@#/%?=~_|!:,.;\(\)]"/g;
			if (url === '/api/auth/signin') {
				const sanitized = baseUrl.replace(reg, '');
				const urls = urlNormalize(sanitized);
				let newUrl = urls.replace(
					/(http:\/\/localhost:3000\/auth\/signin).*/,
					'$1'
				);
				return Promise.resolve(`${newUrl}/auth/signin`);
			} else {
				const sanitized = url.replace(reg, '');
				let newUrl = sanitized.replace(
					/(http:\/\/localhost:3000\/auth\/signin).*/,
					'$1'
				);
				return Promise.resolve(newUrl);
			}
		},
	},
	pages: {
		signIn: '/auth/signin',
	},
	secret: process.env.NEXTAUTH_SECRET,
	useSecureCookies: process.env.NODE_ENV === 'production',
	cookies: {
		sessionToken: {
			name: 'next-auth.session-token',
			options: {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
				path: '/',
				maxAge: 30 * 24 * 60 * 7,
			},
		},
	},
};

export default NextAuth(authOptions);
