import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Ingredient } from '../../components/BurgerIngredients/IngredientsListSection/types';
import type { BurgerConstructorState } from './types';

const initialState: BurgerConstructorState = {
    constructorIngredients: [],
};

const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        setConstructorIngredients: (state, action: PayloadAction<Ingredient[]>) => {
            state.constructorIngredients = action.payload;
        },
        addIngredient: (state, action: PayloadAction<Ingredient>) => {
            state.constructorIngredients.push(action.payload);
        },
        removeIngredient: (state, action: PayloadAction<Ingredient>) => {
            state.constructorIngredients = state.constructorIngredients.filter((ingredient) => ingredient._id !== action.payload._id);
        },
    },
});

export const { setConstructorIngredients } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;