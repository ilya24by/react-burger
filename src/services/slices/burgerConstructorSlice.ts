import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Ingredient } from '../../components/BurgerIngredients/IngredientsListSection/types';

type BurgerConstructorState = {
    constructorIngredients: Ingredient[];
    loading: boolean;
    error: string | null;
};

const initialState: BurgerConstructorState = {
    constructorIngredients: [],
    loading: false,
    error: null,
};

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        setConstructorIngredients: (state, action: PayloadAction<Ingredient[]>) => {
            state.constructorIngredients = action.payload;
        },
    },
});

export const { setConstructorIngredients } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;