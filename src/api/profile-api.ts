import { REACT_APP_BURGER_API } from "../constants/api";
import { checkResponse } from "../utils/api";
import { ProfileResponse } from "./types";

export const getProfile = async (): Promise<ProfileResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/auth/user`, {
        method: 'GET',
    }).then(checkResponse)
};

export const updateProfile = async (profile: { email: string, name: string, password: string }): Promise<ProfileResponse> => {
    return fetch(`${REACT_APP_BURGER_API}/auth/user`, {
        method: 'PATCH',
        body: JSON.stringify(profile),
    }).then(checkResponse)
};