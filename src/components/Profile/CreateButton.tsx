import { createVideoModalState } from '@/store/recoil';
import { BiVideoPlus } from 'react-icons/bi';
import { useRecoilState } from 'recoil';

const CreateButton = () => {
	const [modalOpen, setModalOpen] = useRecoilState(createVideoModalState);
	return (
		<div>
			<button
				type='button'
				name='open'
				title='open'
				className='hidden md:block'
				onClick={() => setModalOpen(!modalOpen)}
			>
				<BiVideoPlus className='text-xl md:text-3xl' />
			</button>
		</div>
	);
};
export default CreateButton;
