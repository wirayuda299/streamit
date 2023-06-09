import { getCreatedDate } from '@/utils/postDate';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { GoVerified } from 'react-icons/go';

type VideoCardProps = {
	authorName: string;
	title: string;
	thumbnail: string;
	authorImage: string;
	videoId: string;
	createdAt: number;
};

const VideoCard: FC<VideoCardProps> = ({
	thumbnail,
	title,
	authorName,
	authorImage,
	videoId,
	createdAt,
}) => {
	return (
		<Link href={`/watch/${videoId}`} className='w-full h-full mb-5'>
			<Image
				className={'rounded object-cover w-full aspect-video'}
				src={thumbnail}
				alt={title}
				width={1000}
				priority
				fetchPriority={'high'}
				height={1000}
			/>
			<div className={'flex items-center space-x-3  py-3 '}>
				<Image
					className={'rounded-full'}
					src={authorImage}
					alt={authorName}
					width={45}
					height={45}
				/>
				<div className='w-fit'>
					<h2
						className={'text-base max-w-[300px] font-semibold break-words'}
						title={title}
					>
						{title}
					</h2>
					<div
						className={
							'text-base font-light flex  md:block gap-3 items-center text-gray-400'
						}
					>
						<div className='md:flex gap-3 items-center'>
							<p>{authorName}</p>
							<p className={'text-xs'}>
								17rb x ditonton - {getCreatedDate(createdAt)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default VideoCard;
