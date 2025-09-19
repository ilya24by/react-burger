import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuView } from "./types";

type BurgerListMenuState = {
    currentMenuView: MenuView;
};

const initialState: BurgerListMenuState = {
    currentMenuView: 'bun',
};

const burgerListMenuSlice = createSlice({
    name: 'burgerListMenu',
    initialState,
    reducers: {
        setCurrentMenuView: (state, action: PayloadAction<MenuView>) => {
            state.currentMenuView = action.payload;
        },
    },
});

export const { setCurrentMenuView } = burgerListMenuSlice.actions;
export default burgerListMenuSlice.reducer;