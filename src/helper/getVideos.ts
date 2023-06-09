import { db } from '@/config/firebase';
import { getDocs, collection, getDoc, doc } from 'firebase/firestore';

export async function getVidoes() {
	try {
		const coll = await getDocs(collection(db, 'posts'));
		const videos = coll.docs.map((videos) => videos.data()) as Videos[];
		return videos;
	} catch (error: any) {
		console.log(error.message);
	}
}

export const getVideoById = async (id: string) => {
	try {
		if (!id) throw new Error('id is not provided');
		const video = await getDoc(doc(db, 'posts', `video-${id}`));
		if (video.exists()) {
			const data = video.data() as Videos;
			return data;
		} else {
			throw new Error('Video not found');
		}
	} catch (error) {}
};
