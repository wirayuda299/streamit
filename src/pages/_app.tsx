import { SessionProvider } from 'next-auth/react';
import Layout from '@/pages/layout';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: any) {
	return (
		<SessionProvider session={session} refetchInterval={5 * 60}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
			<Toaster />
		</SessionProvider>
	);
}
