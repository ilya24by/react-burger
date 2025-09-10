export type RegisterResponse = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
    "message": string
}

export type LoginResponse = {
    "success": boolean,
    "accessToken": string,
    "refreshToken": string,
    "user": {
        "email": string,
        "name": string
    },
    "message": string
}

export type RefreshTokenResponse = {
    "success": boolean,
    "accessToken": string,
    "refreshToken": string
}

export type LogoutResponse = {
    "success": boolean,
    "message": string
}

export type ResetPasswordResponse = {
    "success": boolean,
    "message": string
}

export type FetchResetCodeResponse = {
    "success": boolean,
    "message": string
}

export type ProfileResponse = {
    "success": boolean,
    "user": {
        "email": string,
        "name": string
    }
}
