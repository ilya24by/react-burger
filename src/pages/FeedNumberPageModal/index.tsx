import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { getIngredientsAsync } from '../../services/thunk/ingredients';
import Modal from "../../components/Modal";
import FeedDetailsInfo from "../../components/FeedDetailsInfo";
import Loader from '../../components/Loader';
import commonStyles from '../../styles/common.module.css';
import { useOrderDetails } from '../../hooks/useOrderDetails';

const FeedNumberPageModal = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { number } = useParams<{ number: string }>();
    const { order, isLoading, error } = useOrderDetails(number || '', 'feed');
    const { ingredients, loading } = useAppSelector((state) => state.burgerIngredients);

    useEffect(() => {
        if (ingredients.length === 0 && !loading) {
            dispatch(getIngredientsAsync());
        }
    }, [dispatch, ingredients.length, loading]);

    const handleCloseIngredientDetails = () => {
        navigate(-1);
    };

    if (isLoading) {
        return (
            <Modal onClose={handleCloseIngredientDetails}>
                <Loader />
            </Modal>
        );
    }

    if (error) {
        return (
            <Modal onClose={handleCloseIngredientDetails}>
                <div className={commonStyles.error}>
                    {error}
                </div>
            </Modal>
        );
    }

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
        <Modal onClose={handleCloseIngredientDetails}>
            <FeedDetailsInfo order={order} />
        </Modal>
    );
};

export default FeedNumberPageModal;