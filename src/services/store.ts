import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';
import burderIngredientsReducer from './slices/ingredientsSlice';
import constructorReducer from './slices/burgerConstructorSlice';
import orderReducer from './slices/orderSlice';
import burgerListMenuReducer from './slices/burgerListMenuSlice';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import resetPasswordReducer from './slices/resetPasswordSlice';
import feedReducer from './slices/feedSlice';
import { createWebSocketMiddleware } from './middlewares/webSocketMiddleware';
import { connect, disconnect, sendMessage, onConnected, onDisconnected, onMessageReceived, onError } from './slices/feedSlice';
import { OrdersFeed } from '../api/types';

const appReducer = combineReducers({
    burgerIngredients: burderIngredientsReducer,
    burgerConstructor: constructorReducer,
    order: orderReducer,
    burgerListMenu: burgerListMenuReducer,
    auth: authReducer,
    profile: profileReducer,
    resetPassword: resetPasswordReducer,
    feed: feedReducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
    if (action.type === 'RESET_STORE') {
        state = undefined;
    }
    return appReducer(state, action);
};

// Create WebSocket middleware for feed
const feedWebSocketMiddleware: Middleware = createWebSocketMiddleware<OrdersFeed>(
    {
        connect,
        disconnect,
        sendMessage,
        onConnected,
        onDisconnected,
        onMessageReceived,
        onError,
    },
    { withTokenRefresh: false } // Set to true if you need token refresh functionality
);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(feedWebSocketMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export const resetStore = () => ({ type: 'RESET_STORE' });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
