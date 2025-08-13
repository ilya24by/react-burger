import { Ingredient } from "../BurgerIngredients/IngredientsListSection/types";

export type IngredientDetailsProps = {
    isOpen: boolean;
    ingredient: Ingredient;
    onClose: () => void;
}