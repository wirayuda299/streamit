import Image from 'next/image';
import { FC } from 'react';
import { GoVerified } from 'react-icons/go';
type VideoCardProps = {
	authorName: string;
	title: string;
	thumbnail: string;
	authorImage: string;
};
const VideoCard: FC<VideoCardProps> = ({
	thumbnail,
	title,
	authorName,
	authorImage,
}) => {
	return (
		<div className='w-full max-w-xl'>
			<Image
				className={'rounded-md object-cover w-full aspect-video'}
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
					width={40}
					height={40}
				/>
				<div className='w-full'>
					<h2
						className={'text-sm max-w-[300px] font-normal truncate'}
						title={title}
					>
						{title}
					</h2>
					<div
						className={
							'text-base inline-flex gap-3 items-center font-light text-gray-400'
						}
					>
						{authorName}
						<span>
							<GoVerified />
						</span>
					</div>
					<p className={'text-xs pt-1'}>17rb x ditonton - 6 jam yang lalu</p>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
