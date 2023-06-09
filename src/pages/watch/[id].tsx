import CommentsForm from '@/components/Form/Comments';
import { db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { IoMdShareAlt } from 'react-icons/io';
import { FiLoader } from 'react-icons/fi';
import { getVideoById } from '@/helper/getVideos';
type Context = GetServerSidePropsContext;
type Result = GetServerSidePropsResult<{ data: Videos }>;

export default function VideoDetails({ data }: { data: Videos }) {
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();
	useEffect(() => {
		router.isReady && setLoading(false);
	}, []);
	return (
		<div className='w-full h-screen overflow-y-auto '>
			{loading ? (
				<div className='flex items-center h-screen bg-black justify-center overflow-auto'>
					<FiLoader size={100} className='animate-spin text-white' />
				</div>
			) : (
				<div className='flex items-start h-full'>
					<section className='w-full h-full '>
						<video
							poster={data.thumbnail}
							about={data.title}
							src={data.video}
							preload='metadata'
							controls
							disablePictureInPicture={true}
						>
							<source
								src={data.video}
								about={data.title}
								autoSave='off'
								placeholder={data.thumbnail}
							/>
						</video>
						<div className='w-full h-full'>
							<h2 className='font-semibold text-xl pt-3'>{data.title}</h2>
							<div className='flex justify-between items-center'>
								<div className='flex items-center space-x-3 mt-3'>
									<Image
										className='rounded-full mt-2'
										src={data.authorImage}
										width={50}
										height={50}
										alt={data.title}
									/>
									<h3 className='text-lg font-semibold block'>
										{data.authorName}
										<p className='text-xs font-light text-gray-500 -pt-6'>
											0 Subscribers
										</p>
									</h3>
									<button
										type='button'
										name='subscribe'
										title='subscribe'
										className='bg-white py-2 px-5 font-medium rounded-full text-black'
									>
										Subscribe
									</button>
								</div>
								<div className='flex items-center space-x-3'>
									<div className='flex items-center gap-3 bg-[#272727] px-5 rounded-full min-w-[150px] w-fit overflow-hidden h-10 justify-between'>
										<button
											type='button'
											name='like'
											title='like'
											className=' inline-flex space-x-2 text-center items-center'
										>
											<AiOutlineLike size={25} />
											<span>200k</span>
										</button>
										|
										<button type='button' name='dislike' title='dislike'>
											<AiOutlineDislike size={25} />
										</button>
									</div>
									<button
										type='button'
										name='share'
										title='share'
										className='bg-[#272727] inline-flex items-center gap-3 px-5 py-2 rounded-full'
									>
										<IoMdShareAlt size={25} />
										Share
									</button>
								</div>
							</div>
							<CommentsForm />
						</div>
					</section>
					<section className='w-[300px] h-screen'>
						<div className='sticky top-0 right-0'>Sidebar</div>
					</section>
				</div>
			)}
		</div>
	);
}

export async function getServerSideProps({ query }: Context): Promise<Result> {
	const video = await getVideoById(query.id as string);

	return {
		props: {
			data: video as Videos,
		},
	};
}
