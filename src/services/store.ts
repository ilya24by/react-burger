import { configureStore } from '@reduxjs/toolkit';
import burderIngredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/burgerConstructorSlice';
import orderReducer from './slices/orderSlice';
import burgerListMenuReducer from './slices/burgerListMenuSlice';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import resetPasswordReducer from './slices/resetPasswordSlice';

export const store = configureStore({
    reducer: {
        burgerIngredients: burderIngredientsReducer,
        burgerConstructor: constructorReducer,
        order: orderReducer,
        burgerListMenu: burgerListMenuReducer,
        auth: authReducer,
        profile: profileReducer,
        resetPassword: resetPasswordReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

