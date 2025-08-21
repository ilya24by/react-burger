import { Ingredient } from "../../BurgerIngredients/IngredientsListSection/types";

export type ConstructorListItemProps = {
    item: Ingredient;
    position: 'top' | 'bottom' | undefined;
    index: number;
    onMove: (fromIndex: number, toIndex: number) => void;
}