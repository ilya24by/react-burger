import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { OrdersFeed } from '../../api/types';

export type FeedState = {
    orders: OrdersFeed['orders'];
    total: number;
    totalToday: number;
    isConnected: boolean;
    isConnecting: boolean;
    error: string | null;
};

const initialState: FeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isConnected: false,
    isConnecting: false,
    error: null,
};

// WebSocket action creators
export const connect = createAction<string>('feed/connect');
export const disconnect = createAction('feed/disconnect');
export const sendMessage = createAction<any>('feed/sendMessage');
export const onConnected = createAction<Event>('feed/onConnected');
export const onDisconnected = createAction<CloseEvent>('feed/onDisconnected');
export const onMessageReceived = createAction<OrdersFeed>('feed/onMessageReceived');
export const onError = createAction<Event>('feed/onError');

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        clearFeedData: (state) => {
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(connect, (state) => {
                state.isConnecting = true;
                state.error = null;
            })
            .addCase(onConnected, (state) => {
                state.isConnected = true;
                state.isConnecting = false;
                state.error = null;
            })
            .addCase(onDisconnected, (state) => {
                state.isConnected = false;
                state.isConnecting = false;
            })
            .addCase(onMessageReceived, (state, action: PayloadAction<OrdersFeed>) => {
                state.orders = action.payload.orders;
                state.total = action.payload.total;
                state.totalToday = action.payload.totalToday;
                state.error = null;
            })
            .addCase(onError, (state, action: PayloadAction<Event>) => {
                state.isConnected = false;
                state.isConnecting = false;
                state.error = 'WebSocket connection error';
            })
            .addCase(disconnect, (state) => {
                state.isConnected = false;
                state.isConnecting = false;
                state.error = null;
            });
    },
});

export const { clearFeedData } = feedSlice.actions;

export default feedSlice.reducer;
