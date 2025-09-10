import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, logout } from "../../api/auth-api";
import { LoginResponse, RegisterResponse, LogoutResponse, RefreshTokenResponse } from "../../api/types";

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

export const logoutAsync = createAsyncThunk<LogoutResponse>(
    'auth/logout',
    async () => {
        const response = await logout();
        return response;
    }
);