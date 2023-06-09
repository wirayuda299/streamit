import { handleThumbnailUpload } from '@/helper/thumbnailUpload';
import type { Dispatch, FC, SetStateAction } from 'react';
import { BiMessageError } from 'react-icons/bi';
import { MdUpload } from 'react-icons/md';

type ThumbnailUploadProps = {
	source: any;
	thumbnail: string;
	setThumbnail: Dispatch<SetStateAction<string>>;
};

const ThumbnailUpload: FC<ThumbnailUploadProps> = ({
	source,
	thumbnail,
	setThumbnail,
}) => {
	return (
		<div
			className={`${
				source && thumbnail
					? 'hidden'
					: 'block mx-auto  w-full max-w-4xl  bg-[#282828] rounded-sm'
			}`}
		>
			<header className='w-full border-b p-5 flex justify-between border-slate-500'>
				<h2 className='text-white font-semibold text-lg'>Upload Thumbnail</h2>
				<button type='button' name='kirim masukkan' title='kirim masukkan'>
					<BiMessageError size={25} color='#fff' />
				</button>
			</header>
			<div className='mx-auto flex w-full justify-center'>
				<label
					htmlFor='thumbnail'
					className={`flex min-h-[500px] w-full cursor-pointer flex-col items-center justify-center rounded-lg  shadow-2xl  `}
				>
					<div className='flex flex-col items-center justify-center '>
						<div className='bg-[#1f1f1f] flex justify-center items-center rounded-full p-5 mb-2'>
							<MdUpload className='h-20 w-20 text-gray-400' />
						</div>
						<div className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
							<span className='block text-center font-semibold pb-3'>
								Upload thumbnail
							</span>
							<p className='text-xs text-gray-500 dark:text-gray-400'>
								.jpg, .jpeg, .png image extensions.
							</p>
						</div>
						<label
							htmlFor='thumbnail'
							className='bg-blue-400 px-5 mt-5 py-2 rounded-sm text-black mx-auto font-semibold text-center'
						>
							Pilih File
						</label>
					</div>
					<input
						id='thumbnail'
						type='file'
						accept='.jpg, .jpeg, .png'
						required
						className='hidden '
						onChange={(e) => handleThumbnailUpload(e, setThumbnail)}
					/>
				</label>
			</div>
		</div>
	);
};
export default ThumbnailUpload;
