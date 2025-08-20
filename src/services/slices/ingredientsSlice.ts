import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsAsync } from '../thunk/ingredients';
import type { Ingredient } from '../../components/BurgerIngredients/IngredientsListSection/types';

type IngredientsState = {
    ingredients: Ingredient[];
    loading: boolean;
    error: string | null;
};

const initialState: IngredientsState = {
    ingredients: [],
    loading: false,
    error: null,
};

const burgerIngredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        setIngredients: (state, action: PayloadAction<Ingredient[]>) => {
            state.ingredients = action.payload;
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

export const { setIngredients } = burgerIngredientsSlice.actions;
export default burgerIngredientsSlice.reducer;