import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { OrderStatus } from '../../api/types';

export type ProfileOrder = {
    _id: string;
    ingredients: string[];
    status: OrderStatus;
    number: number;
    createdAt: string;
    updatedAt: string;
    name: string;
};

export type ProfileOrdersResponse = {
    success: boolean;
    orders: ProfileOrder[];
    total: number;
    totalToday: number;
};

export type ProfileOrdersState = {
    orders: ProfileOrder[];
    total: number;
    totalToday: number;
    isConnected: boolean;
    isConnecting: boolean;
    error: string | null;
};

const initialState: ProfileOrdersState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isConnected: false,
    isConnecting: false,
    error: null,
};

// WebSocket action creators
export const connectProfileOrders = createAction<string>('profileOrders/connect');
export const disconnectProfileOrders = createAction('profileOrders/disconnect');
export const sendProfileOrdersMessage = createAction<any>('profileOrders/sendMessage');
export const onProfileOrdersConnected = createAction<Event>('profileOrders/onConnected');
export const onProfileOrdersDisconnected = createAction<CloseEvent>('profileOrders/onDisconnected');
export const onProfileOrdersMessageReceived = createAction<ProfileOrdersResponse>('profileOrders/onMessageReceived');
export const onProfileOrdersError = createAction<Event>('profileOrders/onError');

const profileOrdersSlice = createSlice({
    name: 'profileOrders',
    initialState,
    reducers: {
        clearProfileOrdersData: (state) => {
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectProfileOrders, (state) => {
                state.isConnecting = true;
                state.error = null;
            })
            .addCase(onProfileOrdersConnected, (state) => {
                state.isConnected = true;
                state.isConnecting = false;
                state.error = null;
            })
            .addCase(onProfileOrdersDisconnected, (state) => {
                state.isConnected = false;
                state.isConnecting = false;
            })
            .addCase(onProfileOrdersMessageReceived, (state, action: PayloadAction<ProfileOrdersResponse>) => {
                state.orders = action.payload.orders;
                state.total = action.payload.total;
                state.totalToday = action.payload.totalToday;
                state.error = null;
            })
            .addCase(onProfileOrdersError, (state, action: PayloadAction<Event>) => {
                state.isConnected = false;
                state.isConnecting = false;
                state.error = 'WebSocket connection error';
            })
            .addCase(disconnectProfileOrders, (state) => {
                state.isConnected = false;
                state.isConnecting = false;
                state.error = null;
            });
    },
});

export const { clearProfileOrdersData } = profileOrdersSlice.actions;

export default profileOrdersSlice.reducer;
