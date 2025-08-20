import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsAsync } from '../thunk/ingredients';
import type { Ingredient } from '../../components/BurgerIngredients/IngredientsListSection/types';
import type { IngredientsState } from './types';

const initialState: IngredientsState = {
    ingredients: [],
    ingredientsCounters: {},
    loading: false,
    error: null,
};

const burgerIngredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        increaseIngredientCounter: (state, action: PayloadAction<{ ingredientId: string }>) => {
            const { ingredientId } = action.payload;
            state.ingredientsCounters[ingredientId] += 1;
        },
        decreaseIngredientCounter: (state, action: PayloadAction<{ ingredientId: string }>) => {
            const { ingredientId } = action.payload;
            if (state.ingredientsCounters[ingredientId] > 0) {
                state.ingredientsCounters[ingredientId] -= 1;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getIngredientsAsync.fulfilled, (state, action) => {
                state.ingredients = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getIngredientsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getIngredientsAsync.rejected, (state, action) => {
                state.error = action.error?.message ?? 'Unknown error';
                state.loading = false;
            })
    }
});

export const { increaseIngredientCounter, decreaseIngredientCounter } = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;