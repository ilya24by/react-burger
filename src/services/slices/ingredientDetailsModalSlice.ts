import { createSlice } from '@reduxjs/toolkit';

const ingredientDetailsModalSlice = createSlice({
    name: 'ingredientDetailsModal',
    initialState: { ingredientDetails: null, isShowIngredientDetails: false },
    reducers: {
        showIngredientDetailsModal: (state, action) => {
            state.ingredientDetails = action.payload;
            state.isShowIngredientDetails = true;
        },
        closeIngredientDetailsModal: (state) => {
            state.ingredientDetails = null;
            state.isShowIngredientDetails = false;
        },
    },
});


export const { showIngredientDetailsModal, closeIngredientDetailsModal } = ingredientDetailsModalSlice.actions;
export default ingredientDetailsModalSlice.reducer;