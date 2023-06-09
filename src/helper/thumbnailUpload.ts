import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';

export const handleThumbnailUpload = async (
	event: ChangeEvent<HTMLInputElement>,
	setThumbnail: Dispatch<SetStateAction<string>>
) => {
	try {
		if (!event.target.files) return;
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function (e) {
			const image = new Image();
			image.src = e.target?.result?.toString() as string;
			image.onload = function () {
				console.log({ width: image.width, height: image.height });
				if (image.width > 1280 || image.height > 720) {
					toast.error(
						'please upload image with width 1280px or less, and height 720px or less'
					);
					return;
				} else {
					if (e.target) {
						return setThumbnail(e.target.result as string);
					}
				}
			};
		};
	} catch (error: any) {
		console.log(error.message);
	}
};
