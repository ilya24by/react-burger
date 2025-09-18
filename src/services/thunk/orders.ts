import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderDetails } from "../../api/burger-api";
import { clearConstructorIngredients } from "../slices/burgerConstructorSlice";
import { clearIngredientsCounters } from "../slices/ingredientsSlice";
import { OrderResponse } from "../../api/types";

export const getOrderDetails = createAsyncThunk<OrderResponse, string[]>(
    'orders/getOrderDetails',
    async (ingredientIds, thunkAPI) => {
        const response = await fetchOrderDetails(ingredientIds);
        thunkAPI.dispatch(clearConstructorIngredients());
        thunkAPI.dispatch(clearIngredientsCounters());
        return response;
    }
)