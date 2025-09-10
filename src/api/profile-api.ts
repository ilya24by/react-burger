import { REACT_APP_BURGER_API } from "../constants/api";
import { checkResponse } from "../utils/api";
import { getCookie } from "../utils/data";
import { ProfileResponse } from "./types";

export const getProfile = async (): Promise<ProfileResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${getCookie('token')}`,
        }
    }).then(checkResponse)
};

export const updateProfile = async (profile: { email: string, name: string, password: string }): Promise<ProfileResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/auth/user`, {
        method: 'PATCH',
        body: JSON.stringify(profile),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${getCookie('token')}`,
        }
    }).then(checkResponse)
};