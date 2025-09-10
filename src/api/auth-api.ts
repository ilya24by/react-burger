import { REACT_APP_BURGER_API } from "../constants/api";
import { checkResponse } from "../utils/api";
import { FetchResetCodeResponse, LoginResponse, LogoutResponse, RegisterResponse, ResetPasswordResponse } from "./types";
import { RefreshTokenResponse } from "./types";

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    }).then(checkResponse)
};

export const register = async (email: string, password: string, name: string): Promise<RegisterResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
    }).then(checkResponse)
};

export const logout = async (): Promise<LogoutResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/auth/logout`, {
        method: 'POST',
    }).then(checkResponse)
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/auth/token`, {
        method: 'POST',
    }).then(checkResponse)
};

export const resetPassword = async (email: string): Promise<ResetPasswordResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/password-reset`, {
        method: 'POST',
        body: JSON.stringify({ email }),
    }).then(checkResponse)
};

export const fetchResetCode = async (password: string, token: string): Promise<FetchResetCodeResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/password-reset/reset`, {
        method: 'POST',
        body: JSON.stringify({ password, token }),
    }).then(checkResponse)
};