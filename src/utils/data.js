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