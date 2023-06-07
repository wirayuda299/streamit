import { db, storages } from '@/lib/firestore';
import { createVideoModalState } from '@/store/recoil';
import { setDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineClose, AiOutlineUpload } from 'react-icons/ai';
import { useRecoilState } from 'recoil';
import VideoUpload from '../FileUpload/VideoUpload';

const CreateVideo = () => {
	const [modal, setModal] = useRecoilState(createVideoModalState);
	const { data: session } = useSession();
	const [source, setSource] = useState<any>();
	const [thumbnail, setThumbnail] = useState<string>('');
	const titleRef = useRef<HTMLInputElement>(null);
	const descRef = useRef<HTMLInputElement>(null);
	const categoryRef = useRef<HTMLInputElement>(null);

	if (!modal) return null;

	const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
		try {
			if (!event.target.files) return;
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = async (event) => {
				if (event.target) {
					setSource(event.target.result);
				}
			};
		} catch (error: any) {
			console.log(error.message);
		}
	};

	const handleThumbnailUpload = async (
		event: ChangeEvent<HTMLInputElement>
	) => {
		try {
			if (!event.target.files) return;
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = async (event) => {
				if (event.target) return setThumbnail(event.target.result as string);
			};
		} catch (error: any) {
			console.log(error.message);
		}
	};

	const uploadVideo = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const uuid = crypto.randomUUID();
			const storageRef = `post/${uuid}/video`;
			const imageRef = ref(storages, storageRef);
			await uploadString(imageRef, source, 'data_url')
				.then(async () => {
					const downloadUrl = await getDownloadURL(imageRef);
					await setDoc(doc(db, 'posts', `video-${uuid}`), {
						authorId: session?.user.uid,
						authorName: session?.user.name,
						authorImage: session?.user.image,
						video: downloadUrl,
						thumbnail,
						title: titleRef.current?.value ?? '',
						category: categoryRef.current?.value,
					});
				})
				.then(() => {
					console.log('video uploaded');
					setModal(false);
					setSource(null);
					setThumbnail('');
				});
		} catch (error: any) {
			console.log(error.message);
		}
	};

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
							onClick={() => setModal(false)}
						>
							<AiOutlineClose size={30} />
						</button>
						<div
							className={`flex w-full max-w-[500px] bg-[#282828] items-center justify-center `}
						>
							<div className='w-full'>
								{!source ? (
									<VideoUpload handleFileChange={handleFileChange} />
								) : (
									<div
										className={`${
											source && thumbnail ? 'hidden' : 'block w-full  max-w-xl '
										}`}
									>
										<div className='mx-auto flex w-full justify-center'>
											<label
												htmlFor='thumbnail'
												className={`flex h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg  shadow-2xl `}
											>
												<div className='flex flex-col items-center justify-center pb-6 pt-5'>
													<AiOutlineUpload className='h-12 w-12 text-gray-400' />
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
													id='thumbnail'
													type='file'
													accept='.jpg, .jpeg, .png'
													required
													className='hidden '
													onChange={handleThumbnailUpload}
												/>
											</label>
										</div>
									</div>
								)}
								{source && thumbnail && (
									<form className='p-3' onSubmit={uploadVideo}>
										<label
											className='flex flex-col font-semibold text-white '
											htmlFor='video-title'
										>
											Video Title
											<input
												ref={titleRef}
												type='text'
												id='video-title'
												placeholder='Title'
												className='bg-transparent text-xs focus:outline-none'
											/>
										</label>
										<label
											className='flex flex-col font-semibold text-white '
											htmlFor='video-descriptions'
										>
											Video descriptions
											<input
												ref={descRef}
												type='text'
												id='video-descriptions'
												placeholder='Descriptions'
												className='bg-transparent text-xs focus:outline-none'
											/>
										</label>
										<label
											className='flex flex-col font-semibold text-white '
											htmlFor='video-category'
										>
											Video Category
											<input
												ref={categoryRef}
												type='text'
												id='video-category'
												placeholder='Category'
												className='bg-transparent text-xs focus:outline-none'
											/>
										</label>
										<button type='submit'>Upload</button>
									</form>
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
