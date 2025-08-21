import { Ingredient } from "../../BurgerIngredients/IngredientsListSection/types";

export type ConstructorListItemProps = {
    item: Ingredient;
    position: 'top' | 'bottom' | undefined;
}