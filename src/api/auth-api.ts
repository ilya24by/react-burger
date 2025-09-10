import { REACT_APP_BURGER_API } from "../constants/api";
import { checkResponse } from "../utils/api";
import { FetchResetCodeResponse, LoginResponse, LogoutResponse, RegisterResponse, ResetPasswordResponse } from "./types";
import { RefreshTokenResponse } from "./types";

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(checkResponse)
};

export const register = async (email: string, password: string, name: string): Promise<RegisterResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(checkResponse)
};

export const logout = async (): Promise<LogoutResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(checkResponse)
};

export const fetchRefreshToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken })
    }).then(checkResponse)
};

export const resetPassword = async (email: string): Promise<ResetPasswordResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/password-reset`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(checkResponse)
};

export const fetchResetCode = async (password: string, token: string): Promise<FetchResetCodeResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/password-reset/reset`, {
        method: 'POST',
        body: JSON.stringify({ password, token }),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(checkResponse)
};