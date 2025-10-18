import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import Modal from "../../components/Modal";
import FeedDetailsInfo from "../../components/FeedDetailsInfo";
import Loader from '../../components/Loader';
import commonStyles from '../../styles/common.module.css';

const FeedNumberPageModal = () => {
    const navigate = useNavigate();
    const { number } = useParams<{ number: string }>();
    const { orders, isConnected } = useSelector((state: RootState) => state.feed);

    const handleCloseIngredientDetails = () => {
        navigate(-1);
    };

    if (!isConnected) {
        return (
            <Modal onClose={handleCloseIngredientDetails}>
                <Loader />
            </Modal>
        );
    }

    const order = orders.find(order => order.number.toString() === number);

    if (!order) {
        return (
            <Modal onClose={handleCloseIngredientDetails}>
                <div className={commonStyles.error}>
                    Заказ #{number} не найден
                </div>
            </Modal>
        );
    }

    return (
        <div>
            <Modal onClose={handleCloseIngredientDetails}>
                <FeedDetailsInfo order={order} />
            </Modal>
        </div>
    );
};

export default FeedNumberPageModal;