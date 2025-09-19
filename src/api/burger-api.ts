import { REACT_APP_BURGER_API } from '../constants/api';
import { checkResponse } from '../utils/api';
import { OrderResponse } from './types';

export const fetchIngredients = async () => {
    return fetch(`${REACT_APP_BURGER_API}/ingredients`).then(checkResponse)
}

export const fetchOrderDetails = async (ordersId: string[]): Promise<OrderResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingredients: ordersId,
        }),
    }).then(checkResponse)
}