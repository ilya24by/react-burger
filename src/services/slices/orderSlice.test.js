import orderReducer, { hideOrderDetailsModal } from './orderSlice';
import { getOrderDetails } from '../thunk/orders';

describe('orderSlice', () => {
    const initialState = {
        isShowOrderDetailsModal: false,
        order: null,
        isLoading: false,
        error: false,
    };

    const mockOrder = {
        success: true,
        name: 'Test Order',
        order: {
            _id: 'order-id',
            ingredients: ['ingredient1', 'ingredient2'],
            status: 'done',
            number: 1,
            createdAt: '2023-01-01T00:00:00.000Z',
            updatedAt: '2023-01-01T00:00:00.000Z',
            name: 'Test Order'
        }
    };

    describe('initial state', () => {
        it('should return the initial state', () => {
            expect(orderReducer(undefined, { type: 'unknown' })).toEqual(initialState);
        });
    });

    describe('reducers', () => {
        it('should handle hideOrderDetailsModal', () => {
            const stateWithModal = {
                ...initialState,
                isShowOrderDetailsModal: true
            };

            const action = hideOrderDetailsModal();
            const state = orderReducer(stateWithModal, action);

            expect(state.isShowOrderDetailsModal).toBe(false);
        });
    });

    describe('extraReducers - getOrderDetails', () => {
        it('should handle getOrderDetails.pending', () => {
            const action = { type: getOrderDetails.pending.type };
            const state = orderReducer(initialState, action);

            expect(state.isLoading).toBe(true);
        });

        it('should handle getOrderDetails.fulfilled', () => {
            const action = {
                type: getOrderDetails.fulfilled.type,
                payload: mockOrder
            };
            const state = orderReducer(initialState, action);

            expect(state.order).toEqual(mockOrder);
            expect(state.isLoading).toBe(false);
            expect(state.isShowOrderDetailsModal).toBe(true);
        });

        it('should handle getOrderDetails.rejected', () => {
            const stateWithOrder = {
                ...initialState,
                order: mockOrder,
                isShowOrderDetailsModal: true
            };

            const action = { type: getOrderDetails.rejected.type };
            const state = orderReducer(stateWithOrder, action);

            expect(state.isShowOrderDetailsModal).toBe(false);
            expect(state.order).toBeNull();
            expect(state.isLoading).toBe(false);
            expect(state.error).toBe(true);
        });
    });
});
