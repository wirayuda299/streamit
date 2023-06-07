import type { FC } from 'react';
import UserImage from './UserImage';
import CreateButton from './CreateButton';
import Notification from './Notification';
import { signOut } from 'next-auth/react';
type ProfileProps = {};

const Profile: FC<ProfileProps> = (props) => {
	return (
		<div className='flex items-center space-x-5 h-full'>
			<CreateButton />
			<Notification />
			<UserImage />
			<button
				onClick={() =>
					signOut({
						callbackUrl: '/auth/signin',
						redirect: true,
					})
				}
			>
				Log Out
			</button>
		</div>
	);
};
export default Profile;
