import type { FC } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { BiMenuAltLeft } from 'react-icons/bi';

type CommentsFormProps = {};

const CommentsForm: FC<CommentsFormProps> = (props) => {
	const { data: session } = useSession();

	return (
		<section className='mt-5'>
			<div className='flex items-center gap-5 py-5'>
				<p>200k comments</p>
				<button className='inline-flex items-center gap-2'>
					<BiMenuAltLeft size={25} />
					Urutkan
				</button>
			</div>
			<form className='flex items-center gap-3'>
				<Image
					className='rounded-full'
					src={session?.user.image ?? ''}
					alt={session?.user.name ?? ''}
					width={50}
					height={50}
				/>
				<input
					className='bg-transparent focus:outline-none text-xs font-light py-1 border-b w-full border-gray-500 border-opacity-50'
					type='text'
					placeholder='Add comment...'
				/>
			</form>
		</section>
	);
};
export default CommentsForm;
