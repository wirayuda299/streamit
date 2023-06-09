import type { ChangeEvent, FC } from 'react';
import { BiMessageError } from 'react-icons/bi';
import { MdUpload } from 'react-icons/md';

type VideoUploadProps = {
	handleFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const VideoUpload: FC<VideoUploadProps> = ({ handleFileChange }) => {
	return (
		<div className='mx-auto  w-full max-w-4xl  bg-[#282828] '>
			<header className='w-full border-b p-5 flex justify-between border-slate-500'>
				<h2 className='text-white font-semibold text-lg'>Upload Video</h2>
				<button type='button' name='kirim masukkan' title='kirim masukkan'>
					<BiMessageError size={25} color='#fff' />
				</button>
			</header>
			<label
				htmlFor='dropzone-file'
				className={`flex min-h-[500px] w-full cursor-pointer flex-col items-center justify-center rounded-lg  shadow-2xl `}
			>
				<div className='flex flex-col items-center justify-center '>
					<div className='bg-[#1f1f1f] flex justify-center items-center rounded-full p-5 mb-2'>
						<MdUpload className='h-20 w-20  text-gray-400' />
					</div>
					<div className='mb-2 text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center'>
						<span className='block text-center font-semibold'>
							Click to upload
						</span>
						<p className='text-xs text-gray-500 dark:text-gray-400'>
							.MOV, .mp4 video extensions
						</p>
						<label
							htmlFor='dropzone-file'
							className='bg-blue-400 px-5 mt-5 py-2 rounded-sm text-black mx-auto font-semibold text-center'
						>
							Pilih File
						</label>
					</div>
				</div>
				<input
					id='dropzone-file'
					type='file'
					accept='video/*'
					required
					className='hidden '
					onChange={handleFileChange}
				/>
			</label>
		</div>
	);
};
export default VideoUpload;
