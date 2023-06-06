import { SessionProvider } from 'next-auth/react';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: any) {
	return (
		<SessionProvider session={session} refetchInterval={5 * 60}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}
