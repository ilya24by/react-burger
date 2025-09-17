import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProfileResponse } from "../../api/types";
import { getProfile, updateProfile } from "../../api/profile-api";

export const getProfileAsync = createAsyncThunk<ProfileResponse>(
    'profile/getProfile',
    async () => {
        const response = await getProfile();
        return response;
    }
);
export const updateProfileAsync = createAsyncThunk<ProfileResponse, { email: string, name: string, password: string }>(
    'profile/updateProfile',
    async (profile: { email: string, name: string, password: string }) => {
        const response = await updateProfile(profile);
        return response;
    }
);


