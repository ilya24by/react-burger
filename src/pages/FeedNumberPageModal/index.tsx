import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import FeedDetailsInfo from "../../components/FeedDetailsInfo";

const FeedNumberPageModal = () => {
    const navigate = useNavigate()

    const handleCloseIngredientDetails = () => {
        navigate(-1)
    }

    return (
        <div>
            <Modal onClose={handleCloseIngredientDetails}>
                <FeedDetailsInfo />
            </Modal>
        </div>
    );
};

export default FeedNumberPageModal;