import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderDetails } from "../../api/burger-api";
import { clearConstructorIngredients } from "../slices/burgerConstructorSlice";
import { clearIngredientsCounters } from "../slices/ingredientsSlice";

export type OrderResponse = {
    "name": string,
    "order": {
        "number": number
    },
    "success": boolean
}

export const getOrderDetails = createAsyncThunk<OrderResponse, string[]>(
    'orders/getOrderDetails',
    async (ingredientIds, thunkAPI) => {
        const response = await fetchOrderDetails(ingredientIds);
        thunkAPI.dispatch(clearConstructorIngredients());
        thunkAPI.dispatch(clearIngredientsCounters());
        return response as OrderResponse;
    }
)