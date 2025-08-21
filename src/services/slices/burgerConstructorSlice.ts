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
            state.constructorIngredients.splice(bunIndex + 1, 0, action.payload);
        },

        removeIngredient: (state, action: PayloadAction<Ingredient>) => {
            state.constructorIngredients = state.constructorIngredients.filter((ingredient) => ingredient._id !== action.payload._id);
        },

        reorderIngredients: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
            const { fromIndex, toIndex } = action.payload;
            if (fromIndex === toIndex) return;
            const items = state.constructorIngredients;
            if (!items[fromIndex] || !items[toIndex]) return;
            if (items[fromIndex].type === 'bun' || items[toIndex].type === 'bun') return;
            const [moved] = items.splice(fromIndex, 1);
            items.splice(toIndex, 0, moved);
        },
    },
});

export const { addIngredient, removeIngredient, addBuns, reorderIngredients } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;