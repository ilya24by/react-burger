export type LoginRequestParams = {
    email: string;
    password: string;
}

export type RegisterRequestParams = {
    email: string;
    password: string;
    name: string;
}

export type UpdateProfileRequestParams = {
    email: string;
    name: string;
    password: string;
}



export type ResetPasswordRequestParams = {
    email: string;
}

export type ResetCodeRequestParams = {
    password: string;
    token: string;
}