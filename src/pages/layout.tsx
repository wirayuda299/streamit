import type { ReactNode } from 'react';
import { Roboto } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { RecoilRoot } from 'recoil';
import CreateVideo from '@/components/Modal/CreateVideo';

const roboto = Roboto({
	weight: '400',
	display: 'swap',
	preload: true,
	subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<div
			className={`w-full h-screen overflow-hidden bg-[#0f0f0f] text-white ${roboto.className}`}
		>
			<RecoilRoot>
				<div className={'flex'}>
					<Sidebar />
					<div className={'w-full '}>
						<Header />
						<main className={'w-full h-screen overflow-y-auto p-5'}>
							{children}
						</main>
					</div>
				</div>
				<footer>footer</footer>
				<CreateVideo />
			</RecoilRoot>
		</div>
	);
}
