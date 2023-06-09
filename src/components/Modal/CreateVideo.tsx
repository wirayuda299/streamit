import { createVideoModalState } from '@/store/recoil';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import { handleFileChange } from '@/helper/videoFileUpload';
import dynamic from 'next/dynamic';
const VideoDetail = dynamic(() => import('../Form/VideoDetailForm'));
const ThumbnailUpload = dynamic(() => import('../FileUpload/ThumbnailUpload'));
const VideoUpload = dynamic(() => import('../FileUpload/VideoUpload'));

const CreateVideo = () => {
	const [modal, setModal] = useRecoilState(createVideoModalState);
	const { data: session } = useSession();
	const [source, setSource] = useState<any>();
	const [thumbnail, setThumbnail] = useState<string>('');

	if (!modal) return null;

	return (
		<>
			{createPortal(
				<div className='fixed top-0 w-full h-screen z-50 overflow-hidden bg-black bg-opacity-50 backdrop-blur-md'>
					<div className='w-full grid place-items-center h-screen relative'>
						<button
							name='close'
							type='button'
							title='close '
							className='absolute top-3 right-3 text-white'
							onClick={() => {
								setModal(false);
								setSource(null);
								setThumbnail('');
							}}
						>
							<AiOutlineClose size={30} />
						</button>
						<div
							className={`flex w-full min-h-[500px] items-center justify-center `}
						>
							<div className='w-full h-full'>
								{!source ? (
									<VideoUpload
										handleFileChange={(e) => handleFileChange(e, setSource)}
									/>
								) : (
									<ThumbnailUpload
										setThumbnail={setThumbnail}
										source={source}
										thumbnail={thumbnail}
									/>
								)}
								{source && thumbnail && (
									<VideoDetail
										session={session}
										setModal={setModal}
										setSource={setSource}
										setThumbnail={setThumbnail}
										source={source}
										thumbnail={thumbnail}
									/>
								)}
							</div>
						</div>
					</div>
				</div>,
				document.getElementById('modal-root') as Element
			)}
		</>
	);
};
export default CreateVideo;
