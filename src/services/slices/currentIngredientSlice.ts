import { createSlice } from '@reduxjs/toolkit';

const currentIngredientSlice = createSlice({
    name: 'currentIngredient',
    initialState: { currentIngredient: null },
    reducers: {
        setIngredientDetailsToModal: (state, action) => {
            state.currentIngredient = action.payload;
        },
        removeIngredientDetailsFromModal: (state) => {
            state.currentIngredient = null;
        },
    },
});


export const { setIngredientDetailsToModal, removeIngredientDetailsFromModal } = currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;