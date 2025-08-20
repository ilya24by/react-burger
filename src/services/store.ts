import { configureStore } from '@reduxjs/toolkit';
import burderIngredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/burgerConstructorSlice';
import orderReducer from './slices/orderSlice';
import ingredientDetailsModalReducer from './slices/ingredientDetailsModalSlice';

export const store = configureStore({
    reducer: {
        burgerIngredients: burderIngredientsReducer,
        burgerConstructor: constructorReducer,
        order: orderReducer,
        ingredientDetailsModal: ingredientDetailsModalReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

