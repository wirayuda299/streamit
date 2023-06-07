import Logo from '@/components/Logo';
import Link from 'next/link';
import { AiFillHome, AiFillLike } from 'react-icons/ai';
import { MdOutlineSubscriptions } from 'react-icons/md';
import { RiVideoLine } from 'react-icons/ri';
import { BiTimeFive } from 'react-icons/bi';

const Sidebar = () => {
	const navlists = [
		{
			id: 1,
			name: 'Home',
			path: '/',
			icon: <AiFillHome size={30} />,
		},
		{
			id: 2,
			name: 'Subscriptions',
			path: '/subscriptions',
			icon: <MdOutlineSubscriptions size={30} />,
		},
		{
			id: 3,
			name: 'Your Videos',
			path: '/your-videos',
			icon: <RiVideoLine size={30} />,
		},
		{
			id: 4,
			name: 'Watch later',
			path: '/watch-later',
			icon: <BiTimeFive size={30} />,
		},
		{
			id: 5,
			name: 'Liked Videos',
			path: '/liked-videos',
			icon: <AiFillLike size={30} />,
		},
	];
	return (
		<aside className={'w-[250px] h-screen p-5 '}>
			<header className={'hidden md:flex h-20'}>
				<Logo />
			</header>
			<nav>
				<ul className={'flex flex-col justify-center gap-10 '}>
					{navlists.map((list) => (
						<li key={list.id}>
							<Link href={list.path} className={'flex items-center space-x-9'}>
								{list.icon}
								<span>{list.name}</span>
							</Link>
							{list.id === 2 && <hr className={'pt-3 mt-5'} />}
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
};
export default Sidebar;
