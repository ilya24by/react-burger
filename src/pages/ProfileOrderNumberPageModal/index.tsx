import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { getIngredientsAsync } from '../../services/thunk/ingredients';
import Modal from "../../components/Modal";
import FeedDetailsInfo from "../../components/FeedDetailsInfo";
import Loader from '../../components/Loader';
import commonStyles from '../../styles/common.module.css';
import { useOrderDetails } from '../../hooks/useOrderDetails';

const ProfileOrderNumberPageModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { number } = useParams<{ number: string }>();
    const { order, isLoading, error } = useOrderDetails(number || '', 'profileOrders');
    const { ingredients, loading } = useSelector((state: RootState) => state.burgerIngredients);

    useEffect(() => {
        if (ingredients.length === 0 && !loading) {
            dispatch(getIngredientsAsync());
        }
    }, [dispatch, ingredients.length, loading]);

    const handleCloseOrderDetails = () => {
        navigate(-1);
    };

    if (isLoading) {
        return (
            <Modal onClose={handleCloseOrderDetails}>
                <Loader />
            </Modal>
        );
    }

    if (error) {
        return (
            <Modal onClose={handleCloseOrderDetails}>
                <div className={commonStyles.error}>
                    {error}
                </div>
            </Modal>
        );
    }

    if (!order) {
        return (
            <Modal onClose={handleCloseOrderDetails}>
                <div className={commonStyles.error}>
                    Заказ #{number} не найден
                </div>
            </Modal>
        );
    }

    return (
        <Modal onClose={handleCloseOrderDetails}>
            <FeedDetailsInfo order={order} />
        </Modal>
    );
};

export default ProfileOrderNumberPageModal;
