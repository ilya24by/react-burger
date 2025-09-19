import { RefObject } from "react";

export type Ingredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    id?: string;
}

export type BurgerIngredientsProps = {
    ingredients: Ingredient[];
}

export type IngredientsListSectionProps = {
    ingredients: Ingredient[];
    title: string;
}

export type IngredientsListSectionPropsExtended = IngredientsListSectionProps & {
    rootRef: RefObject<HTMLDivElement | null>;
}

export type IngredientListSectionItemProps = {
    ingredient: Ingredient;
}

export type MenuView = 'bun' | 'sauce' | 'main';