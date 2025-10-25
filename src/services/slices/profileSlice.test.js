import profileReducer from './profileSlice';
import { getProfileAsync, updateProfileAsync } from '../thunk/profile';

describe('profileSlice', () => {
    const initialState = {};

    const mockUser = {
        email: 'test@example.com',
        name: 'Test User'
    };

    const mockProfileResponse = {
        success: true,
        user: mockUser
    };

    describe('initial state', () => {
        it('should return the initial state', () => {
            expect(profileReducer(undefined, { type: 'unknown' })).toEqual(initialState);
        });
    });

    describe('extraReducers - getProfileAsync', () => {
        it('should handle getProfileAsync.pending', () => {
            const action = { type: getProfileAsync.pending.type };
            const state = profileReducer(initialState, action);

            expect(state.isLoading).toBe(true);
        });

        it('should handle getProfileAsync.fulfilled', () => {
            const action = {
                type: getProfileAsync.fulfilled.type,
                payload: mockProfileResponse
            };
            const state = profileReducer(initialState, action);

            expect(state.user).toEqual(mockUser);
            expect(state.isLoading).toBe(false);
            expect(state.isError).toBe(false);
        });

        it('should handle getProfileAsync.rejected', () => {
            const action = { type: getProfileAsync.rejected.type };
            const state = profileReducer(initialState, action);

            expect(state.isLoading).toBe(false);
            expect(state.isError).toBe(true);
        });
    });

    describe('extraReducers - updateProfileAsync', () => {
        it('should handle updateProfileAsync.pending', () => {
            const action = { type: updateProfileAsync.pending.type };
            const state = profileReducer(initialState, action);

            expect(state.isUpdateProfileLoading).toBe(true);
        });

        it('should handle updateProfileAsync.fulfilled', () => {
            const updatedUser = {
                email: 'updated@example.com',
                name: 'Updated User'
            };
            const mockUpdateResponse = {
                success: true,
                user: updatedUser
            };

            const action = {
                type: updateProfileAsync.fulfilled.type,
                payload: mockUpdateResponse
            };
            const state = profileReducer(initialState, action);

            expect(state.user).toEqual(updatedUser);
            expect(state.isUpdateProfileLoading).toBe(false);
            expect(state.isUpdateProfileError).toBe(false);
            expect(state.isUpdateProfileSuccess).toBe(true);
        });

        it('should handle updateProfileAsync.rejected', () => {
            const action = { type: updateProfileAsync.rejected.type };
            const state = profileReducer(initialState, action);

            expect(state.isUpdateProfileLoading).toBe(false);
            expect(state.isUpdateProfileError).toBe(true);
            expect(state.isUpdateProfileSuccess).toBe(false);
        });
    });
});
