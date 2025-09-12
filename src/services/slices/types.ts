import { Ingredient } from "../../components/BurgerIngredients/IngredientsListSection/types";

export type BurgerConstructorState = {
    constructorIngredients: Ingredient[];
};

export type IngredientsState = {
    ingredients: Ingredient[];
    loading: boolean;
    error: string | null;
    ingredientsCounters: {
        [key: string]: number;
    };
};

export type AuthState = {
    success: boolean;
    isLoggedIn: boolean;
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;

    isLoginLoading: boolean;
    isLoginError: boolean;

    isRegisterLoading: boolean;
    isRegisterError: boolean;

    isLogoutLoading: boolean;
    isLogoutError: boolean;
}

export type ResetPasswordState = {
    isSuccessRequestResetPassword: boolean;
    isSuccessRequestResetCode: boolean;

    resetPasswordMessage: string;
    resetCodeMessage: string;

    isResetPasswordLoading: boolean;
    isResetCodeLoading: boolean;

    isResetPasswordError: boolean;
    isResetCodeError: boolean;
}


export type ProfileState = {
    user: {
        email: string;
        name: string;
    };
    isLoading: boolean;
    isError: boolean;
}