import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, logout } from "../../api/auth-api";
import { LoginResponse, RegisterResponse, LogoutResponse, RefreshTokenResponse } from "../../api/types";
import { deleteCookie, getCookie } from "../../utils/data";

export const loginAsync = createAsyncThunk<LoginResponse, { email: string, password: string }>(
    'auth/login',
    async ({ email, password }) => {
        const response = await login(email, password);
        return response;
    }
);

export const registerAsync = createAsyncThunk<RegisterResponse, { email: string, password: string, name: string }>(
    'auth/register',
    async ({ email, password, name }) => {
        const response = await register(email, password, name);
        return response;
    }
);

export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async (refreshToken: string, { dispatch }) => {
        try {
            await logout(refreshToken);
        } finally {
            localStorage.removeItem('refreshToken');
            deleteCookie('token');
        }
    }
);

export const initAuth = createAsyncThunk(
    "auth/init",
    async () => {
        const accessToken = getCookie("token") || "";
        const refreshToken = localStorage.getItem("refreshToken") || "";
        return { accessToken, refreshToken };
    }
);