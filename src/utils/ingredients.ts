import { Ingredient } from '../components/BurgerIngredients/types';

export const getIngredientImageById = (ingredients: Ingredient[], ingredientId: string): string => {
    const ingredient = ingredients.find(ing => ing._id === ingredientId);
    return ingredient?.image || '';
};

export const getIngredientById = (ingredients: Ingredient[], ingredientId: string): Ingredient | undefined => {
    return ingredients.find(ing => ing._id === ingredientId);
};

export const calculateOrderPrice = (ingredients: Ingredient[], ingredientIds: string[]): number => {
    return ingredientIds.reduce((total, ingredientId) => {
        const ingredient = getIngredientById(ingredients, ingredientId);
        return total + (ingredient?.price || 0);
    }, 0);
};
