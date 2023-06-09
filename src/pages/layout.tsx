import type { ReactNode } from 'react';
import { Roboto } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { RecoilRoot } from 'recoil';
import CreateVideo from '@/components/Modal/CreateVideo';
import Head from 'next/head';

const roboto = Roboto({
	weight: '400',
	display: 'swap',
	preload: true,
	subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<>
			<Head>
				<title>StreamIt - Share your vidoes around the world</title>
				<meta
					name='description'
					content='Video stream website inspired by Youtube web app'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div
				className={`w-full h-screen overflow-hidden bg-[#0f0f0f] text-white ${roboto.className}`}
			>
				<RecoilRoot>
					<div className={'flex h-screen '}>
						<Sidebar />
						<div className={'w-full h-full'}>
							<Header />
							<main className={'w-full h-screen overflow-hidden'}>
								{children}
							</main>
						</div>
					</div>
					<footer>footer</footer>
					<CreateVideo />
				</RecoilRoot>
			</div>
		</>
	);
}
