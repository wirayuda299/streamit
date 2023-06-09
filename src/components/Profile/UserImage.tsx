import Image from 'next/image';
import { useSession } from 'next-auth/react';

const UserImage = () => {
	const { data: session } = useSession();
	return (
		<div>
			<Image
				width={40}
				alt={session?.user.name ?? 'user photo profile'}
				className={'rounded-full w-9 h-9 sm:w-10 sm:h-10'}
				src={session?.user.image ?? ''}
				height={40}
				priority
				fetchPriority={'auto'}
				title={session?.user.name ?? ''}
			/>
		</div>
	);
};
export default UserImage;
