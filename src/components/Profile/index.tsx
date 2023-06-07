import type { FC } from 'react';
import UserImage from './UserImage';
import CreateButton from './CreateButton';
import Notification from './Notification';
type ProfileProps = {};

const Profile: FC<ProfileProps> = (props) => {
	return (
		<div className='flex items-center space-x-5 h-full'>
			<CreateButton />
			<Notification />
			<UserImage />
		</div>
	);
};
export default Profile;
