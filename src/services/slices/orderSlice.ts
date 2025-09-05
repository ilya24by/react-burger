import { createSlice } from '@reduxjs/toolkit';
import { getOrderDetails } from '../thunk/orders';
import type { OrderResponse } from '../thunk/orders';
import { clearConstructorIngredients } from './burgerConstructorSlice';

const orderSlice = createSlice({
    name: 'order',
    initialState: { isShowOrderDetailsModal: false, order: null as OrderResponse | null, isLoading: false, error: false },
    reducers: {
        hideOrderDetailsModal: (state) => {
            state.isShowOrderDetailsModal = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getOrderDetails.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getOrderDetails.fulfilled, (state, action) => {
            state.order = action.payload;
            state.isLoading = false;
            state.isShowOrderDetailsModal = true;
        });
        builder.addCase(getOrderDetails.rejected, (state) => {
            state.isShowOrderDetailsModal = false;
            state.order = null;
            state.isLoading = false;
            state.error = true;
        });
    },
});

export const { hideOrderDetailsModal } = orderSlice.actions;
export default orderSlice.reducer;