import profileOrdersReducer, {
    clearProfileOrdersData,
    connectProfileOrders,
    disconnectProfileOrders,
    onProfileOrdersConnected,
    onProfileOrdersDisconnected,
    onProfileOrdersMessageReceived,
    onProfileOrdersError
} from './profileOrdersSlice';

describe('profileOrdersSlice', () => {
    const initialState = {
        orders: [],
        total: 0,
        totalToday: 0,
        isConnected: false,
        isConnecting: false,
        error: null,
    };

    const mockProfileOrdersResponse = {
        success: true,
        orders: [
            {
                _id: 'order1',
                ingredients: ['ingredient1', 'ingredient2'],
                status: 'done',
                number: 1,
                createdAt: '2023-01-01T00:00:00.000Z',
                updatedAt: '2023-01-01T00:00:00.000Z',
                name: 'Test Order'
            }
        ],
        total: 50,
        totalToday: 5
    };

    describe('initial state', () => {
        it('should return the initial state', () => {
            expect(profileOrdersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
        });
    });

    describe('reducers', () => {
        it('should handle clearProfileOrdersData', () => {
            const stateWithData = {
                ...initialState,
                orders: mockProfileOrdersResponse.orders,
                total: mockProfileOrdersResponse.total,
                totalToday: mockProfileOrdersResponse.totalToday
            };

            const action = clearProfileOrdersData();
            const state = profileOrdersReducer(stateWithData, action);

            expect(state.orders).toEqual([]);
            expect(state.total).toBe(0);
            expect(state.totalToday).toBe(0);
        });
    });

    describe('extraReducers - WebSocket actions', () => {
        it('should handle connectProfileOrders', () => {
            const action = connectProfileOrders('ws://localhost:3000');
            const state = profileOrdersReducer(initialState, action);

            expect(state.isConnecting).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should handle onProfileOrdersConnected', () => {
            const connectingState = {
                ...initialState,
                isConnecting: true,
                error: 'previous error'
            };

            const action = onProfileOrdersConnected(new Event('open'));
            const state = profileOrdersReducer(connectingState, action);

            expect(state.isConnected).toBe(true);
            expect(state.isConnecting).toBe(false);
            expect(state.error).toBeNull();
        });

        it('should handle onProfileOrdersDisconnected', () => {
            const connectedState = {
                ...initialState,
                isConnected: true,
                isConnecting: true
            };

            const action = onProfileOrdersDisconnected(new CloseEvent('close'));
            const state = profileOrdersReducer(connectedState, action);

            expect(state.isConnected).toBe(false);
            expect(state.isConnecting).toBe(false);
        });

        it('should handle onProfileOrdersMessageReceived', () => {
            const action = onProfileOrdersMessageReceived(mockProfileOrdersResponse);
            const state = profileOrdersReducer(initialState, action);

            expect(state.orders).toEqual(mockProfileOrdersResponse.orders);
            expect(state.total).toBe(mockProfileOrdersResponse.total);
            expect(state.totalToday).toBe(mockProfileOrdersResponse.totalToday);
            expect(state.error).toBeNull();
        });

        it('should handle onProfileOrdersError', () => {
            const action = onProfileOrdersError(new Event('error'));
            const state = profileOrdersReducer(initialState, action);

            expect(state.isConnected).toBe(false);
            expect(state.isConnecting).toBe(false);
            expect(state.error).toBe('WebSocket connection error');
        });

        it('should handle disconnectProfileOrders', () => {
            const connectedState = {
                ...initialState,
                isConnected: true,
                isConnecting: true,
                error: 'some error'
            };

            const action = disconnectProfileOrders();
            const state = profileOrdersReducer(connectedState, action);

            expect(state.isConnected).toBe(false);
            expect(state.isConnecting).toBe(false);
            expect(state.error).toBeNull();
        });
    });
});
