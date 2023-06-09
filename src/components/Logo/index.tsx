import Link from 'next/link';
import { Roboto } from 'next/font/google';

const robotoBold = Roboto({
	weight: '900',
	display: 'swap',
	preload: true,
	subsets: ['latin'],
});

const Logo = () => {
	return (
		<Link
			href={'/'}
			className={`text-lg sm:text-2xl md:text-3xl block  font-bold ${robotoBold.className}`}
		>
			<div className={'text-left'}>StreamIt</div>
		</Link>
	);
};
export default Logo;
