//NOTE: С React 17 я знаком, очень интересно попрактиковаться в 18 и 19 версиях
'use server';

const fetchIngredients = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BURGER_API}/ingredients`);
        return response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default fetchIngredients;