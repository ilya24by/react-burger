import { REACT_APP_BURGER_API } from '../constants/api';
import { checkResponse, getToken } from '../utils/api';
import { OrderResponse, SingleOrderResponse } from './types';

export const fetchIngredients = async () => {
    return fetch(`${REACT_APP_BURGER_API}/ingredients`).then(checkResponse)
}

export const fetchOrderDetails = async (ordersId: string[]): Promise<OrderResponse> => {
    const token = await getToken();
    return fetch(`${REACT_APP_BURGER_API}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify({
            ingredients: ordersId,
        }),
    }).then(checkResponse)
}

export const fetchOrderByNumber = async (orderNumber: string): Promise<SingleOrderResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/orders/${orderNumber}`).then(checkResponse)
}