export const typeTitles = {
    bun: 'Булки',
    main: 'Начинки',
    sauce: 'Соусы'
};

export const filterIngredientsByType = (ingredients) => {
    const groupedByType = ingredients?.reduce((acc, ingredient) => {
        if (!acc[ingredient?.type]) {
            acc[ingredient?.type] = [];
        }
        acc[ingredient?.type].push(ingredient);
        return acc;
    }, {});

    // Convert to array of sections with title and items
    const sections = Object.keys(groupedByType).map(type => ({
        title: typeTitles[type] || type,
        items: groupedByType[type]
    }));

    return sections;
};

export function setCookie(name, value, props) {
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

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
    setCookie(name, '', { expires: -1 });
}