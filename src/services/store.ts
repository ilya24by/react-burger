import { configureStore } from '@reduxjs/toolkit';
import burderIngredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/burgerConstructorSlice';
import orderReducer from './slices/orderSlice';
import currentIngredientReducer from './slices/currentIngredientSlice';

export const store = configureStore({
    reducer: {
        burgerIngredients: burderIngredientsReducer,
        burgerConstructor: constructorReducer,
        order: orderReducer,
        currentIngredient: currentIngredientReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

