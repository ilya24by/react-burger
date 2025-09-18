import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Ingredient } from '../../components/BurgerIngredients/types';
import type { BurgerConstructorState } from './types';
import { v4 as uuidv4 } from 'uuid';

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

            state.constructorIngredients.push({ ...action.payload, id: uuidv4() });
            state.constructorIngredients.unshift({ ...action.payload, id: uuidv4() });
        },
        addIngredient: {
            reducer: (state, action: PayloadAction<Ingredient>) => {
                const bunIndex = state.constructorIngredients.findIndex(ingredient => ingredient.type === 'bun');
                state.constructorIngredients.splice(bunIndex + 1, 0, action.payload);
            },
            prepare: (ingredient: Ingredient) => {
                const id = uuidv4();
                return { payload: { ...ingredient, id } }
            }
        },

        removeIngredient: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            if (index < 0 || index >= state.constructorIngredients.length) return;
            state.constructorIngredients.splice(index, 1);
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

        clearConstructorIngredients: (state) => {
            state.constructorIngredients = [];
        }
    },
});

export const { addIngredient, removeIngredient, addBuns, reorderIngredients, clearConstructorIngredients } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;