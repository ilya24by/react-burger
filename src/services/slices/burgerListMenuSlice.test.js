import burgerListMenuReducer, { setCurrentMenuView } from './burgerListMenuSlice';

describe('burgerListMenuSlice', () => {
    const initialState = {
        currentMenuView: 'bun',
    };

    describe('initial state', () => {
        it('should return the initial state', () => {
            expect(burgerListMenuReducer(undefined, { type: 'unknown' })).toEqual(initialState);
        });
    });

    describe('reducers', () => {
        it('should handle setCurrentMenuView with bun', () => {
            const action = setCurrentMenuView('bun');
            const state = burgerListMenuReducer(initialState, action);

            expect(state.currentMenuView).toBe('bun');
        });

        it('should handle setCurrentMenuView with sauce', () => {
            const action = setCurrentMenuView('sauce');
            const state = burgerListMenuReducer(initialState, action);

            expect(state.currentMenuView).toBe('sauce');
        });

        it('should handle setCurrentMenuView with main', () => {
            const action = setCurrentMenuView('main');
            const state = burgerListMenuReducer(initialState, action);

            expect(state.currentMenuView).toBe('main');
        });
    });
});
