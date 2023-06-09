import UserImage from './UserImage';
import CreateButton from './CreateButton';
import Notification from './Notification';

const Profile = () => {
	return (
		<div className='flex items-center space-x-5 h-full'>
			<CreateButton />
			<Notification />
			<UserImage />
		</div>
	);
};
export default Profile;
