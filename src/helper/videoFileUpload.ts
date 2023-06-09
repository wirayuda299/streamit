import type { ChangeEvent, Dispatch } from 'react';

export const handleFileChange = async (
	event: ChangeEvent<HTMLInputElement>,
	setSource: Dispatch<any>
) => {
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
