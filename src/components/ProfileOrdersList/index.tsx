import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { connectProfileOrders, disconnectProfileOrders } from '../../services/slices/profileOrdersSlice';
import FeedListItem from '../FeedList/FeedListItem';
import styles from './index.module.css';

const ProfileOrdersList = () => {
    const dispatch = useAppDispatch();
    const { orders, isConnected, error } = useAppSelector((state) => state.profileOrders);
    const { accessToken } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (accessToken) {
            const token = accessToken.replace('Bearer ', '');
            const wsUrl = `wss://norma.education-services.ru/orders?token=${token}`;
            dispatch(connectProfileOrders(wsUrl));
        }

        return () => {
            dispatch(disconnectProfileOrders());
        };
    }, [dispatch, accessToken]);

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

    if (orders.length === 0) {
        return (
            <div className={styles.feed_list}>
                <p>У вас пока нет заказов</p>
            </div>
        );
    }

    return (
        <div className={styles.feed_list}>
            {orders.map((order) => (
                <FeedListItem isProfileOrder={true} key={order._id} order={order} />
            ))}
        </div>
    );
};

export default ProfileOrdersList;
