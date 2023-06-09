import { storages, db } from '@/config/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import type { Session } from 'next-auth';
import { useRouter } from 'next/router';
import {
	Dispatch,
	FC,
	FormEvent,
	SetStateAction,
	useRef,
	useState,
} from 'react';
import { toast } from 'react-hot-toast';
import type { SetterOrUpdater } from 'recoil';

type VideoDetailProps = {
	session: Session | null;
	setSource: Dispatch<any>;
	setModal: SetterOrUpdater<boolean>;
	setThumbnail: Dispatch<SetStateAction<string>>;
	source: string;
	thumbnail: string;
};
type Data = {
	message: {
		match?: boolean;
		text: string;
		hash?: string;
	};
};
const VideoDetail: FC<VideoDetailProps> = ({
	session,
	setSource,
	setModal,
	setThumbnail,
	source,
	thumbnail,
}) => {
	const titleRef = useRef<HTMLInputElement>(null);
	const descRef = useRef<HTMLTextAreaElement>(null);
	const categoryRef = useRef<HTMLInputElement>(null);
	const [titlerefLength, setTitlerefLength] = useState<number>(0);
	const [descLength, setDescLength] = useState<number>(0);
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);

	const uploadVideo = async (e: FormEvent) => {
		e.preventDefault();
		try {
			if (!session || !session.user) {
				toast.error('You are not signin, please signin to upload video');
				return router.push('/auth/signin');
			}
			const uuid = crypto.randomUUID();
			const storageRef = `post/${uuid}/video`;
			const imageRef = ref(storages, storageRef);
			setLoading(true);

			const res = await fetch('http://localhost:3000/api/encrypt', {
				method: 'POST',
				body: JSON.stringify({
					uid: session?.user.uid,
				}),
			});
			const data = (await res.json()) as Data;
			if (!data.message.match) {
				toast.error('Your request is not allowed');
				return router.push('/auth/signin');
			}

			await uploadString(imageRef, source, 'data_url')
				.then(async () => {
					const downloadUrl = await getDownloadURL(imageRef);
					await setDoc(doc(db, 'posts', `video-${uuid}`), {
						authorId: data.message.hash,
						authorName: session?.user.name,
						authorImage: session?.user.image,
						videoId: uuid,
						video: downloadUrl,
						thumbnail,
						title: titleRef.current?.value ?? '',
						category: categoryRef.current?.value,
						createdAt: Date.now(),
						comments: [],
						likesBy: [],
						sharedBy: [],
					});
				})
				.then(() => {
					toast.success('Your video has been uploaded');
					setModal(false);
					setSource(null);
					setThumbnail('');
					router.replace(router.asPath);
					setLoading(false);
				});
		} catch (error: any) {
			console.log(error.message);
		}
	};
	return (
		<form
			className='mx-auto  w-full max-w-4xl  bg-[#282828] '
			onSubmit={uploadVideo}
		>
			<header className='w-full border-b p-5 flex justify-between border-slate-500'>
				<h2 className='text-white font-semibold text-lg'>Video Detail</h2>
			</header>
			<div className='flex min-h-[500px] w-full cursor-pointer  rounded-lg  shadow-2xl '>
				<div className='flex flex-col p-5 w-full '>
					<label
						className='flex flex-col pb-4 w-full text-base font-semibold text-white '
						htmlFor='video-title'
					>
						Video Title
						<input
							ref={titleRef}
							type='text'
							maxLength={100}
							onChange={(e) => {
								setTitlerefLength(e.target.value.length);
							}}
							id='video-title'
							placeholder='Title'
							className='bg-transparent w-full border py-3 rounded-md border-opacity-50 border-gray-400 pl-4 text-sm focus:outline-none'
						/>
						<span className='text-right text-xs'>
							{titlerefLength}/{titleRef.current?.maxLength}
						</span>
					</label>
					<label
						className='flex flex-col pb-4 w-full text-base font-semibold text-white '
						htmlFor='video-descriptions'
					>
						Video descriptions
						<textarea
							ref={descRef}
							id='video-descriptions'
							cols={80}
							onChange={(e) => setDescLength(e.target.value.length)}
							maxLength={5000}
							placeholder='Descriptions'
							className='bg-transparent w-full border border-gray-400 py-3 rounded-md border-opacity-50 pl-4 text-sm focus:outline-none resize-none'
						/>
						<span className='text-right text-xs'>
							{descLength}/{descRef?.current?.maxLength}
						</span>
					</label>
					<label
						className='flex flex-col pb-4 w-full text-base font-semibold text-white '
						htmlFor='video-category'
					>
						Video Category
						<input
							ref={categoryRef}
							type='text'
							id='video-category'
							placeholder='Category'
							className='bg-transparent w-full border border-gray-400 py-3 rounded-md border-opacity-50 pl-4 text-sm focus:outline-none'
						/>
					</label>
					<button
						type='submit'
						name='upload'
						title='upload'
						disabled={loading}
						className='bg-blue-400 px-5 mt-5 py-2 rounded-sm text-black mx-auto font-semibold text-center'
					>
						{loading ? 'Uploading....' : 'Upload'}
					</button>
				</div>
			</div>
		</form>
	);
};
export default VideoDetail;
