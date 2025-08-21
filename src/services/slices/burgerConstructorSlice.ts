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
        addBuns: (state, action: PayloadAction<Ingredient>) => {
            if (state.constructorIngredients.find((ingredient) => ingredient.type === 'bun')) {
                state.constructorIngredients = state.constructorIngredients.filter((ingredient) => ingredient.type !== 'bun');
            }

            state.constructorIngredients.push(action.payload);
            state.constructorIngredients.unshift(action.payload);
        },

        addIngredient: (state, action: PayloadAction<Ingredient>) => {
            const bunIndex = state.constructorIngredients.findIndex(ingredient => ingredient.type === 'bun');

            if (bunIndex !== -1) {
                state.constructorIngredients.splice(bunIndex + 1, 0, action.payload);
            } else {
                state.constructorIngredients.push(action.payload);
            }
        },

        removeIngredient: (state, action: PayloadAction<Ingredient>) => {
            state.constructorIngredients = state.constructorIngredients.filter((ingredient) => ingredient._id !== action.payload._id);
        },
    },
});

export const { addIngredient, removeIngredient, addBuns } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;