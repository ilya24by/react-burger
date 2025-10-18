import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../services/store';
import { fetchOrderByNumber } from '../api/burger-api';
import { OrdersFeed } from '../api/types';
import { ProfileOrder } from '../services/slices/profileOrdersSlice';

type Order = OrdersFeed['orders'][0];

interface UseOrderDetailsResult {
    order: Order | null;
    isLoading: boolean;
    error: string | null;
}

export const useOrderDetails = (orderNumber: string, feedType: 'feed' | 'profileOrders'): UseOrderDetailsResult => {
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const feedState = useSelector((state: RootState) =>
        feedType === 'feed' ? state.feed : state.profileOrders
    );

    useEffect(() => {
        const fetchOrder = async () => {
            setIsLoading(true);
            setError(null);

            // First, try to find the order in the WebSocket feed
            const orderFromFeed = feedState.orders.find(
                order => order.number.toString() === orderNumber
            );

            if (orderFromFeed) {
                setOrder(orderFromFeed);
                setIsLoading(false);
                return;
            }

            // If not found in feed, try direct API call
            try {
                const response = await fetchOrderByNumber(orderNumber);
                if (response.success && response.orders.length > 0) {
                    setOrder(response.orders[0]);
                } else {
                    setError(`Заказ #${orderNumber} не найден`);
                }
            } catch (err) {
                setError(`Ошибка при загрузке заказа #${orderNumber}`);
            }

            setIsLoading(false);
        };

        fetchOrder();
    }, [orderNumber, feedState.orders, feedState.isConnected]);

    return { order, isLoading, error };
};
