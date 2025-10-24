import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { connect, disconnect } from '../../services/slices/feedSlice';
import FeedListItem from "./FeedListItem";
import styles from './index.module.css';

const FeedList = () => {
    const dispatch = useAppDispatch();
    const { orders, isConnected, error } = useAppSelector((state) => state.feed);

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

    return (
        <div className={styles.feed_list}>
            {orders.map((order) => (
                <FeedListItem key={order._id} order={order} />
            ))}
        </div>
    );
};

export default FeedList;