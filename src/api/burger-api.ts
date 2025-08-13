import { REACT_APP_BURGER_API } from '../constants/api';

const fetchIngredients = async () => {
    const response = await fetch(`${REACT_APP_BURGER_API}/ingredients`);

    if (!response.ok) {
        throw new Error('Failed to fetch ingredients');
    }

    return response.json();
}

export default fetchIngredients;