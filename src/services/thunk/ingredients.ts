import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchIngredients } from "../../api/burger-api";
import type { Ingredient } from "../../components/BurgerIngredients/IngredientsListSection/types";

export const getIngredientsAsync = createAsyncThunk<Ingredient[]>(
    'ingredients/getIngredients',
    async () => {
        const response = await fetchIngredients();
        return response.data as Ingredient[];
    }
)