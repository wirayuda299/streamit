import { getVidoes } from '@/helper/getVideos';
import dynamic from 'next/dynamic';
const VideoCard = dynamic(() => import('@/components/Video/Card'), {
	ssr: true,
});

export default function Home({ data }: { data: Videos[] }) {
	return (
		<section className='w-full h-screen overflow-y-auto '>
			<div className={'w-full p-5 h-[calc(100vh + 10rem)]'}>
				<div
					className={
						'grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 items-center justify-center   sm:h-fit mb-5 w-full gap-5'
					}
				>
					{data.map((video) => (
						<VideoCard
							createdAt={video.createdAt}
							videoId={video.videoId}
							authorImage={video.authorImage}
							title={video.title}
							thumbnail={video.thumbnail}
							authorName={video.authorName}
							key={video.title}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export async function getServerSideProps() {
	const videos = await getVidoes();

	return {
		props: {
			data: videos ?? [],
		},
	};
}
