import { Ingredient } from "../../components/BurgerIngredients/IngredientsListSection/types";

export type BurgerConstructorState = {
    constructorIngredients: Ingredient[];
};

export type IngredientsState = {
    ingredients: Ingredient[];
    loading: boolean;
    error: string | null;
    ingredientsCounters: {
        [key: string]: number;
    };
};