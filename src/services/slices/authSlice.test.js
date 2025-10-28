import authReducer, { setUser } from './authSlice';
import { initAuth, loginAsync, logoutAsync, registerAsync } from '../thunk/auth';

describe('authSlice', () => {
    const initialState = {
        isLoginLoading: false,
        isLoginError: false,
        isRegisterLoading: false,
        isRegisterError: false,
        isLogoutLoading: false,
        isLogoutError: false,
        isLoggedIn: false,
        isInitLoading: true,
    };

    describe('initial state', () => {
        it('should return the initial state', () => {
            expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
        });
    });

    describe('reducers', () => {
        it('should handle setUser', () => {
            const user = { email: 'test@example.com', name: 'Test User' };
            const action = setUser(user);
            const state = authReducer(initialState, action);

            expect(state.user).toEqual(user);
        });
    });

    describe('extraReducers - initAuth', () => {
        it('should handle initAuth.fulfilled', () => {
            const payload = {
                accessToken: 'access-token',
                refreshToken: 'refresh-token'
            };
            const action = { type: initAuth.fulfilled.type, payload };
            const state = authReducer(initialState, action);

            expect(state.accessToken).toBe('access-token');
            expect(state.refreshToken).toBe('refresh-token');
            expect(state.isLoggedIn).toBe(true);
            expect(state.isInitLoading).toBe(false);
        });

        it('should handle initAuth.rejected', () => {
            const action = { type: initAuth.rejected.type };
            const state = authReducer(initialState, action);

            expect(state.isInitLoading).toBe(false);
        });
    });

    describe('extraReducers - loginAsync', () => {
        it('should handle loginAsync.pending', () => {
            const action = { type: loginAsync.pending.type };
            const state = authReducer(initialState, action);

            expect(state.isLoginLoading).toBe(true);
        });

        it('should handle loginAsync.fulfilled', () => {
            const payload = {
                user: { email: 'test@example.com', name: 'Test User' },
                accessToken: 'access-token',
                refreshToken: 'refresh-token'
            };
            const action = { type: loginAsync.fulfilled.type, payload };
            const state = authReducer(initialState, action);

            expect(state.user).toEqual(payload.user);
            expect(state.accessToken).toBe('access-token');
            expect(state.refreshToken).toBe('refresh-token');
            expect(state.isLoginLoading).toBe(false);
            expect(state.isLoginError).toBe(false);
            expect(state.isLoggedIn).toBe(true);
        });

        it('should handle loginAsync.rejected', () => {
            const action = { type: loginAsync.rejected.type };
            const state = authReducer(initialState, action);

            expect(state.isLoginError).toBe(true);
            expect(state.isLoginLoading).toBe(false);
        });
    });

    describe('extraReducers - registerAsync', () => {
        it('should handle registerAsync.pending', () => {
            const action = { type: registerAsync.pending.type };
            const state = authReducer(initialState, action);

            expect(state.isRegisterLoading).toBe(true);
        });

        it('should handle registerAsync.fulfilled', () => {
            const payload = {
                user: { email: 'test@example.com', name: 'Test User' },
                accessToken: 'access-token',
                refreshToken: 'refresh-token'
            };
            const action = { type: registerAsync.fulfilled.type, payload };
            const state = authReducer(initialState, action);

            expect(state.user).toEqual(payload.user);
            expect(state.accessToken).toBe('access-token');
            expect(state.refreshToken).toBe('refresh-token');
            expect(state.isRegisterLoading).toBe(false);
            expect(state.isRegisterError).toBe(false);
        });

        it('should handle registerAsync.rejected', () => {
            const action = { type: registerAsync.rejected.type };
            const state = authReducer(initialState, action);

            expect(state.isRegisterError).toBe(true);
            expect(state.isRegisterLoading).toBe(false);
        });
    });

    describe('extraReducers - logoutAsync', () => {
        it('should handle logoutAsync.pending', () => {
            const action = { type: logoutAsync.pending.type };
            const state = authReducer(initialState, action);

            expect(state.isLogoutLoading).toBe(true);
        });

        it('should handle logoutAsync.fulfilled', () => {
            const loggedInState = {
                ...initialState,
                isLoggedIn: true,
                user: { email: 'test@example.com', name: 'Test User' },
                accessToken: 'access-token',
                refreshToken: 'refresh-token'
            };
            const action = { type: logoutAsync.fulfilled.type };
            const state = authReducer(loggedInState, action);

            expect(state.isLoggedIn).toBe(false);
            expect(state.isLogoutLoading).toBe(false);
            expect(state.isLogoutError).toBe(false);
            expect(state.user).toBeUndefined();
            expect(state.accessToken).toBe('');
            expect(state.refreshToken).toBe('');
        });

        it('should handle logoutAsync.rejected', () => {
            const action = { type: logoutAsync.rejected.type };
            const state = authReducer(initialState, action);

            expect(state.isLogoutError).toBe(true);
            expect(state.isLogoutLoading).toBe(false);
        });
    });
});
