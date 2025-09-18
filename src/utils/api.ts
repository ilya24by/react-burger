import { fetchRefreshToken } from "../api/auth-api";
import { RefreshTokenResponse } from "../api/types";
import { Ingredient } from "../components/BurgerIngredients/types";
import { COOKIE_EXPIRE_TIME_SECONDS } from "../constants/api";

export const typeTitles = {
    bun: 'Булки',
    main: 'Начинки',
    sauce: 'Соусы'
};

export const filterIngredientsByType = (ingredients: Ingredient[]) => {
    const groupedByType = ingredients?.reduce((acc, ingredient) => {
        if (!acc[ingredient?.type]) {
            acc[ingredient?.type] = [];
        }
        acc[ingredient?.type].push(ingredient);
        return acc;
    }, {} as Record<string, Ingredient[]>);

    const sections = Object.keys(groupedByType).map(type => ({
        title: typeTitles[type as keyof typeof typeTitles] || type,
        items: groupedByType[type]
    }));

    return sections;
};

export function setCookie(name: string, value: string, props: Record<string, any>) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
    setCookie(name, '', { expires: -1 });
}

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
        const newToken = await fetchRefreshToken(refreshToken) as RefreshTokenResponse;
        setCookie('token', newToken.accessToken, { expires: COOKIE_EXPIRE_TIME_SECONDS });
        localStorage.setItem('refreshToken', newToken.refreshToken);
        return newToken.accessToken;
    }

    return null;
}