import ingredientsReducer, {
    increaseIngredientCounter,
    decreaseIngredientCounter,
    clearIngredientsCounters
} from './ingredientsSlice';
import { getIngredientsAsync } from '../thunk/ingredients';

describe('ingredientsSlice', () => {
    const initialState = {
        ingredients: [],
        ingredientsCounters: {},
        loading: false,
        error: null,
    };

    const mockIngredients = [
        {
            _id: 'ingredient1',
            name: 'Test Ingredient 1',
            type: 'main',
            proteins: 10,
            fat: 5,
            carbohydrates: 15,
            calories: 100,
            price: 50,
            image: 'test-image1.png',
            image_mobile: 'test-image1-mobile.png',
            image_large: 'test-image1-large.png',
            __v: 0
        },
        {
            _id: 'ingredient2',
            name: 'Test Ingredient 2',
            type: 'sauce',
            proteins: 5,
            fat: 10,
            carbohydrates: 20,
            calories: 80,
            price: 30,
            image: 'test-image2.png',
            image_mobile: 'test-image2-mobile.png',
            image_large: 'test-image2-large.png',
            __v: 0
        }
    ];

    describe('initial state', () => {
        it('should return the initial state', () => {
            expect(ingredientsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
        });
    });

    describe('reducers', () => {
        it('should handle increaseIngredientCounter without count', () => {
            const action = increaseIngredientCounter({ ingredientId: 'ingredient1' });
            const state = ingredientsReducer(initialState, action);

            expect(state.ingredientsCounters['ingredient1']).toBe(1);
        });

        it('should handle increaseIngredientCounter with count', () => {
            const action = increaseIngredientCounter({ ingredientId: 'ingredient1', count: 5 });
            const state = ingredientsReducer(initialState, action);

            expect(state.ingredientsCounters['ingredient1']).toBe(5);
        });

        it('should increment existing counter', () => {
            const stateWithCounter = {
                ...initialState,
                ingredientsCounters: { ingredient1: 3 }
            };

            const action = increaseIngredientCounter({ ingredientId: 'ingredient1' });
            const state = ingredientsReducer(stateWithCounter, action);

            expect(state.ingredientsCounters['ingredient1']).toBe(4);
        });

        it('should handle decreaseIngredientCounter without count', () => {
            const stateWithCounter = {
                ...initialState,
                ingredientsCounters: { ingredient1: 3 }
            };

            const action = decreaseIngredientCounter({ ingredientId: 'ingredient1' });
            const state = ingredientsReducer(stateWithCounter, action);

            expect(state.ingredientsCounters['ingredient1']).toBe(2);
        });

        it('should handle decreaseIngredientCounter with count', () => {
            const stateWithCounter = {
                ...initialState,
                ingredientsCounters: { ingredient1: 5 }
            };

            const action = decreaseIngredientCounter({ ingredientId: 'ingredient1', count: 2 });
            const state = ingredientsReducer(stateWithCounter, action);

            expect(state.ingredientsCounters['ingredient1']).toBe(3);
        });

        it('should not decrease below zero', () => {
            const stateWithCounter = {
                ...initialState,
                ingredientsCounters: { ingredient1: 1 }
            };

            const action = decreaseIngredientCounter({ ingredientId: 'ingredient1', count: 3 });
            const state = ingredientsReducer(stateWithCounter, action);

            expect(state.ingredientsCounters['ingredient1']).toBe(0);
        });

        it('should not decrease from zero', () => {
            const action = decreaseIngredientCounter({ ingredientId: 'ingredient1' });
            const state = ingredientsReducer(initialState, action);

            expect(state.ingredientsCounters['ingredient1']).toBeUndefined();
        });

        it('should handle clearIngredientsCounters', () => {
            const stateWithCounters = {
                ...initialState,
                ingredientsCounters: { ingredient1: 3, ingredient2: 5 }
            };

            const action = clearIngredientsCounters();
            const state = ingredientsReducer(stateWithCounters, action);

            expect(state.ingredientsCounters).toEqual({});
        });
    });

    describe('extraReducers - getIngredientsAsync', () => {
        it('should handle getIngredientsAsync.pending', () => {
            const action = { type: getIngredientsAsync.pending.type };
            const state = ingredientsReducer(initialState, action);

            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should handle getIngredientsAsync.fulfilled', () => {
            const action = {
                type: getIngredientsAsync.fulfilled.type,
                payload: mockIngredients
            };
            const state = ingredientsReducer(initialState, action);

            expect(state.ingredients).toEqual(mockIngredients);
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
        });

        it('should handle getIngredientsAsync.rejected', () => {
            const action = {
                type: getIngredientsAsync.rejected.type,
                error: { message: 'Network error' }
            };
            const state = ingredientsReducer(initialState, action);

            expect(state.error).toBe('Network error');
            expect(state.loading).toBe(false);
        });

        it('should handle getIngredientsAsync.rejected with unknown error', () => {
            const action = {
                type: getIngredientsAsync.rejected.type,
                error: {}
            };
            const state = ingredientsReducer(initialState, action);

            expect(state.error).toBe('Unknown error');
            expect(state.loading).toBe(false);
        });
    });
});
