import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsAsync } from '../thunk/ingredients';
import type { IngredientsState } from './types';
import type { Ingredient } from '../../components/BurgerIngredients/IngredientsListSection/types';

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
            if (state.ingredientsCounters[ingredientId]) {
                state.ingredientsCounters[ingredientId] += 1;
            } else {
                state.ingredientsCounters[ingredientId] = 1;
            }
        },
        decreaseIngredientCounter: (state, action: PayloadAction<{ ingredientId: string }>) => {
            const { ingredientId } = action.payload;
            if (state.ingredientsCounters[ingredientId] > 0) {
                state.ingredientsCounters[ingredientId] -= 1;
            }
        },
        updateIngredientCounters: (state, action: PayloadAction<Ingredient[]>) => {
            state.ingredientsCounters = {}

            action.payload.forEach(ingredient => {
                if (state.ingredientsCounters[ingredient._id]) {
                    state.ingredientsCounters[ingredient._id] += 1;
                } else {
                    state.ingredientsCounters[ingredient._id] = 1;
                }
            });
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

export const { increaseIngredientCounter, decreaseIngredientCounter, updateIngredientCounters } = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;