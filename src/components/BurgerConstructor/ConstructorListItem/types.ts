import { Ingredient } from "../../BurgerIngredients/IngredientsListSection/types";

export type ConstructorListItemProps = {
    item: Ingredient;
    type: 'top' | 'bottom' | undefined;
}