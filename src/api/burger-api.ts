import { REACT_APP_BURGER_API } from '../constants/api';

export const fetchIngredients = async () => {
    const response = await fetch(`${REACT_APP_BURGER_API}/ingredients`);

    if (!response.ok) {
        throw new Error('Failed to fetch ingredients');
    }

    return response.json();
}


export const fetchOrderDetails = async (ordersId: string[]) => {
    const response = await fetch(`${REACT_APP_BURGER_API}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ingredients: ordersId,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch order details');
    }

    return response.json();
}