import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { getIngredientsAsync } from '../../services/thunk/ingredients';
import styles from './index.module.css';
import FeedDetailsInfo from "../../components/FeedDetailsInfo";
import Loader from '../../components/Loader';
import commonStyles from '../../styles/common.module.css';
import { useOrderDetails } from '../../hooks/useOrderDetails';

const FeedNumberPage = () => {
    const dispatch = useAppDispatch();
    const { number } = useParams<{ number: string }>();
    const { order, isLoading, error } = useOrderDetails(number || '', 'feed');
    const { ingredients, loading } = useAppSelector((state) => state.burgerIngredients);

    useEffect(() => {
        if (ingredients.length === 0 && !loading) {
            dispatch(getIngredientsAsync());
        }
    }, [dispatch, ingredients.length, loading]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className={styles.feed_number_page_container}>
                <div className={commonStyles.error}>
                    {error}
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className={styles.feed_number_page_container}>
                <div className={commonStyles.error}>
                    Заказ #{number} не найден
                </div>
            </div>
        );
    }

    return (
        <div className={styles.feed_number_page_container}>
            <FeedDetailsInfo order={order} />
        </div>
    );
};

export default FeedNumberPage;