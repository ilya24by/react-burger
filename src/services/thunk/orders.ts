import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderDetails } from "../../api/burger-api";

export type OrderResponse = {
    "name": string,
    "order": {
        "number": number
    },
    "success": boolean
}

export const getOrderDetails = createAsyncThunk<OrderResponse, string[]>(
    'orders/getOrderDetails',
    async (ordersIds: string[]) => {
        const response = await fetchOrderDetails(ordersIds);
        return response as OrderResponse;
    }
)