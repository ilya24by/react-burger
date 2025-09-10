import { getCookie, setCookie } from "./data";
import { fetchRefreshToken } from "../api/auth-api";
import { COOKIE_EXPIRE_TIME_SECONDS } from "../constants/api";

export function checkResponse(res: Response) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}



export async function getToken() {
    const token = getCookie('token');

    if (token) {
        return token;
    }

    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
        const newToken = await fetchRefreshToken(refreshToken);
        setCookie('token', newToken.accessToken, { expires: COOKIE_EXPIRE_TIME_SECONDS });
        localStorage.setItem('refreshToken', newToken.refreshToken);
        return newToken.accessToken;
    }

    return null;
}