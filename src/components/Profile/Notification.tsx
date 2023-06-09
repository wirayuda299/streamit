import { AiOutlineBell } from 'react-icons/ai';

const Notification = () => {
	return (
		<div>
			<button
				className='hidden md:block'
				type='button'
				name='notifications'
				title='notifications'
			>
				<AiOutlineBell className='text-xl md:text-3xl' />
			</button>
		</div>
	);
};
export default Notification;
