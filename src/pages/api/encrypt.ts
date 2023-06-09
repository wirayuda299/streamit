import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

type Data = {
	message: {
		match?: boolean;
		text: string;
		hash?: string;
	};
};

type ReqBody = {
	uid: string;
};

type UsersType = {
	uid: string;
	data: {
		name: string;
		email: string;
		image: string;
		createdAt: number;
	};
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { uid } = JSON.parse(req.body) as ReqBody;
	if (!uid) {
		res.status(400).json({ message: { text: 'No uid porvided' } });
		res.end();
	}

	const user = await getDoc(doc(db, 'users', uid));
	const { uid: uidDb } = user.data() as UsersType;

	if (user.exists()) {
		const { uid } = JSON.parse(req.body) as ReqBody;

		const isMatch = await bcrypt.compare(uid, uidDb);
		res.status(200).json({
			message: {
				text: 'Match',
				match: isMatch,
				hash: uidDb,
			},
		});
	} else {
		res.status(404).json({
			message: {
				text: 'not found',
			},
		});
	}
}
