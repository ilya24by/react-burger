import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: { order: null },
    reducers: {
        getOrder: (state, action) => {
            state.order = action.payload;
        },
        updateOrder: (state, action) => {
            state.order = action.payload;
        },
    },
});

export const { getOrder, updateOrder } = orderSlice.actions;
export default orderSlice.reducer;