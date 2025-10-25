import feedReducer, {
    clearFeedData,
    connect,
    disconnect,
    onConnected,
    onDisconnected,
    onMessageReceived,
    onError
} from './feedSlice';

describe('feedSlice', () => {
    const initialState = {
        orders: [],
        total: 0,
        totalToday: 0,
        isConnected: false,
        isConnecting: false,
        error: null,
    };

    const mockOrdersFeed = {
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
        total: 100,
        totalToday: 10
    };

    describe('initial state', () => {
        it('should return the initial state', () => {
            expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
        });
    });

    describe('reducers', () => {
        it('should handle clearFeedData', () => {
            const stateWithData = {
                ...initialState,
                orders: mockOrdersFeed.orders,
                total: mockOrdersFeed.total,
                totalToday: mockOrdersFeed.totalToday
            };

            const action = clearFeedData();
            const state = feedReducer(stateWithData, action);

            expect(state.orders).toEqual([]);
            expect(state.total).toBe(0);
            expect(state.totalToday).toBe(0);
        });
    });

    describe('extraReducers - WebSocket actions', () => {
        it('should handle connect', () => {
            const action = connect('ws://localhost:3000');
            const state = feedReducer(initialState, action);

            expect(state.isConnecting).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should handle onConnected', () => {
            const connectingState = {
                ...initialState,
                isConnecting: true,
                error: 'previous error'
            };

            const action = onConnected(new Event('open'));
            const state = feedReducer(connectingState, action);

            expect(state.isConnected).toBe(true);
            expect(state.isConnecting).toBe(false);
            expect(state.error).toBeNull();
        });

        it('should handle onDisconnected', () => {
            const connectedState = {
                ...initialState,
                isConnected: true,
                isConnecting: true
            };

            const action = onDisconnected(new CloseEvent('close'));
            const state = feedReducer(connectedState, action);

            expect(state.isConnected).toBe(false);
            expect(state.isConnecting).toBe(false);
        });

        it('should handle onMessageReceived', () => {
            const action = onMessageReceived(mockOrdersFeed);
            const state = feedReducer(initialState, action);

            expect(state.orders).toEqual(mockOrdersFeed.orders);
            expect(state.total).toBe(mockOrdersFeed.total);
            expect(state.totalToday).toBe(mockOrdersFeed.totalToday);
            expect(state.error).toBeNull();
        });

        it('should handle onError', () => {
            const action = onError(new Event('error'));
            const state = feedReducer(initialState, action);

            expect(state.isConnected).toBe(false);
            expect(state.isConnecting).toBe(false);
            expect(state.error).toBe('WebSocket connection error');
        });

        it('should handle disconnect', () => {
            const connectedState = {
                ...initialState,
                isConnected: true,
                isConnecting: true,
                error: 'some error'
            };

            const action = disconnect();
            const state = feedReducer(connectedState, action);

            expect(state.isConnected).toBe(false);
            expect(state.isConnecting).toBe(false);
            expect(state.error).toBeNull();
        });
    });
});
