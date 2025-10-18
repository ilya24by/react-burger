export type AuthorizationResponse = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
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

export type OrderResponse = {
    "name": string,
    "order": {
        "number": number
    },
    "success": boolean
}

export type OrderStatus = 'created' | 'pending' | 'done';

export type OrdersFeed = {
    success: boolean;
    orders: Array<{
        "ingredients": Array<string>,
        "_id": string,
        "status": OrderStatus,
        "number": number,
        "createdAt": string,
        "updatedAt": string
        "name": string
    }>;
    total: number;
    totalToday: number;
}

export type SingleOrderResponse = {
    success: boolean;
    orders: Array<{
        "ingredients": Array<string>,
        "_id": string,
        "status": OrderStatus,
        "number": number,
        "createdAt": string,
        "updatedAt": string
        "name": string
    }>;
}