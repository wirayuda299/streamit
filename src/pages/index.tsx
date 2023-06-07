import Head from 'next/head';
import VideoCard from '@/components/Video/Card';
import { GetServerSidePropsResult } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

type Videos = {
	video: string;
	authorId: string;
	authorName: string;
	title: string;
	thumbnail: string;
	authorImage: string;
};
export default function Home({ data }: { data: Videos[] }) {
	return (
		<>
			<Head>
				<title>StreamIt</title>
				<meta
					name='description'
					content='Video stream website inspired by Youtube web app'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={'w-full h-full'}>
				<div
					className={
						'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  w-full gap-5'
					}
				>
					{data.map((video) => (
						<VideoCard
							authorImage={video.authorImage}
							title={video.title}
							thumbnail={video.thumbnail}
							authorName={video.authorName}
							key={video.title}
						/>
					))}
				</div>
			</div>
		</>
	);
}

type Result = GetServerSidePropsResult<{ data: Videos[] }>;

export async function getServerSideProps(): Promise<Result> {
	const coll = await getDocs(collection(db, 'posts'));
	const videos = coll.docs.map((videos) => videos.data()) as Videos[];

	return {
		props: {
			data: videos,
		},
	};
}
