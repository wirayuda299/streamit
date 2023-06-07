import type { ChangeEvent, FC } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

type VideoUploadProps = {
	handleFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const VideoUpload: FC<VideoUploadProps> = ({ handleFileChange }) => {
	return (
		<div className='mx-auto flex w-full max-w-xl justify-center'>
			<label
				htmlFor='dropzone-file'
				className={`flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg  shadow-2xl `}
			>
				<div className='flex flex-col items-center justify-center pb-6 pt-5'>
					<AiOutlineCloudUpload className='h-12 w-12 text-gray-400' />
					<div className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
						<span className='block text-center font-semibold'>
							Click to upload
						</span>
						<p className='text-xs text-gray-500 dark:text-gray-400'>
							PNG, JPG or any image extensions.
						</p>
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
