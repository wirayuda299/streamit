import SearchForm from '@/components/Form/Search';
import Logo from '@/components/Logo';
import Profile from '../Profile';

const Header = () => {
	return (
		<header className={'w-full h-20 mx-auto'}>
			<div className={' w-full flex items-center justify-around h-full'}>
				<div className={'block md:hidden'}>
					<Logo />
				</div>
				<div>
					<SearchForm />
				</div>
				<div>
					<Profile />
				</div>
			</div>
		</header>
	);
};

export default Header;
