import { createVideoModalState } from '@/store/recoil';
import { BiVideoPlus } from 'react-icons/bi';
import { useRecoilState } from 'recoil';

const CreateButton = () => {
	const [modalOpen, setModalOpen] = useRecoilState(createVideoModalState);
	return (
		<div>
			<button onClick={() => setModalOpen(!modalOpen)}>
				<BiVideoPlus size={30} />
			</button>
		</div>
	);
};
export default CreateButton;
