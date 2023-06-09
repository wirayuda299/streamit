import SearchForm from '@/components/Form/Search';
import Logo from '@/components/Logo';
import Profile from '../Profile';

const Header = () => {
	return (
		<header className={'w-full h-20 flex justify-center items-center'}>
			<div className='container mx-auto px-3 h-full'>
				<div className='flex justify-between items-center h-full'>
					<div className='opacity-1 md:opacity-0 '>
						<Logo />
					</div>
					<div>
						<SearchForm />
					</div>
					<div>
						<Profile />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
