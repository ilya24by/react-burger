import { combineReducers, configureStore } from '@reduxjs/toolkit';
import burderIngredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/burgerConstructorSlice';
import orderReducer from './slices/orderSlice';
import burgerListMenuReducer from './slices/burgerListMenuSlice';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import resetPasswordReducer from './slices/resetPasswordSlice';

const appReducer = combineReducers({
    burgerIngredients: burderIngredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    burgerListMenu: burgerListMenuReducer,
    auth: authReducer,
    profile: profileReducer,
    resetPassword: resetPasswordReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
    if (action.type === 'RESET_STORE') {
        state = undefined;
    }
    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export const resetStore = () => ({ type: 'RESET_STORE' });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
