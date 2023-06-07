import type { FC } from 'react';
import { AiOutlineBell } from 'react-icons/ai';

type NotificationProps = {};

const Notification: FC<NotificationProps> = (props) => {
	return (
		<div>
			<button>
				<AiOutlineBell size={30} />
			</button>
		</div>
	);
};
export default Notification;
