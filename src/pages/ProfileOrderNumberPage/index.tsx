import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { getIngredientsAsync } from '../../services/thunk/ingredients';
import FeedDetailsInfo from '../../components/FeedDetailsInfo';
import Loader from '../../components/Loader';
import commonStyles from '../../styles/common.module.css';
import styles from './index.module.css';
import { useOrderDetails } from '../../hooks/useOrderDetails';

const ProfileOrderNumberPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { number } = useParams<{ number: string }>();
    const { order, isLoading, error } = useOrderDetails(number || '', 'profileOrders');
    const { ingredients, loading } = useSelector((state: RootState) => state.burgerIngredients);

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
            <div className={styles.profile_order_number_page_container}>
                <div className={commonStyles.error}>
                    {error}
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className={styles.profile_order_number_page_container}>
                <div className={commonStyles.error}>
                    Заказ #{number} не найден
                </div>
            </div>
        );
    }

    return (
        <div className={styles.profile_order_number_page_container}>
            <FeedDetailsInfo order={order} />
        </div>
    );
};

export default ProfileOrderNumberPage;