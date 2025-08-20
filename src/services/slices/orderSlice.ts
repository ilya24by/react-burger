import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: { order: null, loading: false, error: null as string | null },
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload;
        },
    },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;