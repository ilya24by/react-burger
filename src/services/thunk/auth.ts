import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, register, logout, fetchRefreshToken } from "../../api/auth-api";
import { AuthorizationResponse, RefreshTokenResponse } from "../../api/types";
import { deleteCookie, getCookie, setCookie } from "../../utils/api";
import { COOKIE_EXPIRE_TIME_SECONDS } from "../../constants/api";
import { LoginRequestParams, RegisterRequestParams } from "./types";

export const loginAsync = createAsyncThunk<AuthorizationResponse, LoginRequestParams>(
    'auth/login',
    async ({ email, password }) => {
        const response = await login(email, password);

        if (response?.success) {
            localStorage.setItem('refreshToken', response.refreshToken);
            setCookie('token', response.accessToken, { expires: COOKIE_EXPIRE_TIME_SECONDS });
        }

        return response;
    }
);

export const registerAsync = createAsyncThunk<AuthorizationResponse, RegisterRequestParams>(
    'auth/register',
    async ({ email, password, name }) => {
        const response = await register(email, password, name);
        return response;
    }
);

export const logoutAsync = createAsyncThunk(
    'auth/logout',
    async (refreshToken: string) => {
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

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
    const refreshTokenValue = localStorage.getItem("refreshToken");
    if (!refreshTokenValue) {
        throw new Error("No refresh token available");
    }

    const response = await fetchRefreshToken(refreshTokenValue);

    if (response?.success) {
        localStorage.setItem('refreshToken', response.refreshToken);
        setCookie('token', response.accessToken, { expires: COOKIE_EXPIRE_TIME_SECONDS });
    }

    return response;
};