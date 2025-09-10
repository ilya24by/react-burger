import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./types";
import { loginAsync, logoutAsync, registerAsync, } from "../thunk/auth";
import { getCookie } from "../../utils/data";


const cookieToken = getCookie('token');

const initialState: Partial<AuthState> = {
    accessToken: cookieToken,
    refreshToken: localStorage.getItem('refreshToken') || '',
    isLoggedIn: !!cookieToken,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;

                state.isLoginLoading = false;
                state.isLoginError = false;
                state.isLoggedIn = true;
            })
            .addCase(loginAsync.rejected, (state) => {
                state.isLoginError = true;
                state.isLoginLoading = false;
            })
            .addCase(loginAsync.pending, (state) => {
                state.isLoginLoading = true;
            })

            .addCase(registerAsync.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;

                state.isRegisterLoading = false;
                state.isRegisterError = false;
            })
            .addCase(registerAsync.rejected, (state) => {
                state.isRegisterError = true;
                state.isRegisterLoading = false;
            })
            .addCase(registerAsync.pending, (state) => {
                state.isRegisterLoading = true;
            })

            .addCase(logoutAsync.fulfilled, (state) => {
                state = {}
                state.isLoggedIn = false;
                state.isLogoutLoading = false;
                state.isLogoutError = false;
            })
            .addCase(logoutAsync.rejected, (state) => {
                state.isLogoutError = true;
                state.isLogoutLoading = false;
            })
            .addCase(logoutAsync.pending, (state) => {
                state.isLogoutLoading = true;
            })
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;