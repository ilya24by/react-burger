import burgerConstructorReducer, {
    addBuns,
    addIngredient,
    removeIngredient,
    reorderIngredients,
    clearConstructorIngredients
} from './burgerConstructorSlice';

describe('burgerConstructorSlice', () => {
    const initialState = {
        constructorIngredients: [],
    };

    const mockIngredient = {
        _id: 'test-id',
        name: 'Test Ingredient',
        type: 'main',
        proteins: 10,
        fat: 5,
        carbohydrates: 15,
        calories: 100,
        price: 50,
        image: 'test-image.png',
        image_mobile: 'test-image-mobile.png',
        image_large: 'test-image-large.png',
        __v: 0
    };

    const mockBun = {
        ...mockIngredient,
        type: 'bun'
    };

    describe('initial state', () => {
        it('should return the initial state', () => {
            expect(burgerConstructorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
        });
    });

    describe('reducers', () => {
        it('should handle addBuns', () => {
            const action = addBuns(mockBun);
            const state = burgerConstructorReducer(initialState, action);

            expect(state.constructorIngredients).toHaveLength(2);
            expect(state.constructorIngredients[0].type).toBe('bun');
            expect(state.constructorIngredients[1].type).toBe('bun');
            expect(state.constructorIngredients[0].id).toBeDefined();
            expect(state.constructorIngredients[1].id).toBeDefined();
        });

        it('should replace existing bun when adding new bun', () => {
            const existingBun = { ...mockBun, id: 'existing-bun-id' };
            const stateWithBun = {
                constructorIngredients: [existingBun, existingBun]
            };

            const action = addBuns(mockBun);
            const state = burgerConstructorReducer(stateWithBun, action);

            expect(state.constructorIngredients).toHaveLength(2);
            expect(state.constructorIngredients[0].id).not.toBe('existing-bun-id');
            expect(state.constructorIngredients[1].id).not.toBe('existing-bun-id');
        });

        it('should handle addIngredient', () => {
            const action = addIngredient(mockIngredient);
            const state = burgerConstructorReducer(initialState, action);

            expect(state.constructorIngredients).toHaveLength(1);
            expect(state.constructorIngredients[0]).toEqual({
                ...mockIngredient,
                id: expect.any(String)
            });
        });

        it('should add ingredient after bun', () => {
            const bun = { ...mockBun, id: 'bun-id' };
            const stateWithBun = {
                constructorIngredients: [bun, bun]
            };

            const action = addIngredient(mockIngredient);
            const state = burgerConstructorReducer(stateWithBun, action);

            expect(state.constructorIngredients).toHaveLength(3);
            expect(state.constructorIngredients[1]).toEqual({
                ...mockIngredient,
                id: expect.any(String)
            });
        });

        it('should handle removeIngredient', () => {
            const ingredient1 = { ...mockIngredient, id: 'id1' };
            const ingredient2 = { ...mockIngredient, id: 'id2' };
            const stateWithIngredients = {
                constructorIngredients: [ingredient1, ingredient2]
            };

            const action = removeIngredient(0);
            const state = burgerConstructorReducer(stateWithIngredients, action);

            expect(state.constructorIngredients).toHaveLength(1);
            expect(state.constructorIngredients[0]).toEqual(ingredient2);
        });

        it('should not remove ingredient if index is out of bounds', () => {
            const ingredient = { ...mockIngredient, id: 'id1' };
            const stateWithIngredient = {
                constructorIngredients: [ingredient]
            };

            const action = removeIngredient(5);
            const state = burgerConstructorReducer(stateWithIngredient, action);

            expect(state.constructorIngredients).toHaveLength(1);
        });

        it('should handle reorderIngredients', () => {
            const ingredient1 = { ...mockIngredient, id: 'id1' };
            const ingredient2 = { ...mockIngredient, id: 'id2' };
            const ingredient3 = { ...mockIngredient, id: 'id3' };
            const stateWithIngredients = {
                constructorIngredients: [ingredient1, ingredient2, ingredient3]
            };

            const action = reorderIngredients({ fromIndex: 0, toIndex: 2 });
            const state = burgerConstructorReducer(stateWithIngredients, action);

            expect(state.constructorIngredients[0]).toEqual(ingredient2);
            expect(state.constructorIngredients[1]).toEqual(ingredient3);
            expect(state.constructorIngredients[2]).toEqual(ingredient1);
        });

        it('should not reorder if fromIndex equals toIndex', () => {
            const ingredient1 = { ...mockIngredient, id: 'id1' };
            const ingredient2 = { ...mockIngredient, id: 'id2' };
            const stateWithIngredients = {
                constructorIngredients: [ingredient1, ingredient2]
            };

            const action = reorderIngredients({ fromIndex: 0, toIndex: 0 });
            const state = burgerConstructorReducer(stateWithIngredients, action);

            expect(state.constructorIngredients).toEqual([ingredient1, ingredient2]);
        });

        it('should not reorder bun ingredients', () => {
            const bun = { ...mockBun, id: 'bun-id' };
            const ingredient = { ...mockIngredient, id: 'ingredient-id' };
            const stateWithBunAndIngredient = {
                constructorIngredients: [bun, bun, ingredient]
            };

            const action = reorderIngredients({ fromIndex: 0, toIndex: 2 });
            const state = burgerConstructorReducer(stateWithBunAndIngredient, action);

            expect(state.constructorIngredients).toEqual([bun, bun, ingredient]);
        });

        it('should handle clearConstructorIngredients', () => {
            const ingredient = { ...mockIngredient, id: 'id1' };
            const stateWithIngredient = {
                constructorIngredients: [ingredient]
            };

            const action = clearConstructorIngredients();
            const state = burgerConstructorReducer(stateWithIngredient, action);

            expect(state.constructorIngredients).toEqual([]);
        });
    });
});
