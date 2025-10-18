import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../services/store';
import { connect, disconnect } from '../../services/slices/feedSlice';
import FeedListItem from "./FeedListItem";
import styles from './index.module.css';

const FeedList = () => {
    const dispatch = useDispatch();
    const { orders, isConnected, error } = useSelector((state: RootState) => state.feed);
    const { ingredients } = useSelector((state: RootState) => state.burgerIngredients);

    console.log(ingredients);

    useEffect(() => {
        dispatch(connect('wss://norma.nomoreparties.space/orders/all'));

        return () => {
            dispatch(disconnect());
        };
    }, [dispatch]);

    if (error) {
        return (
            <div className={styles.feed_list}>
                <p>Ошибка подключения: {error}</p>
            </div>
        );
    }

    if (!isConnected) {
        return (
            <div className={styles.feed_list}>
                <p>Подключение к серверу...</p>
            </div>
        );
    }


    console.log(orders);

    return (
        <div className={styles.feed_list}>
            {orders.map((order) => (
                <FeedListItem key={order._id} order={order} />
            ))}
        </div>
    );
};

export default FeedList;