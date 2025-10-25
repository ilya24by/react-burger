import resetPasswordReducer from './resetPasswordSlice';
import { fetchResetCodeAsync, resetPasswordAsync } from '../thunk/resetPassword';

describe('resetPasswordSlice', () => {
    const initialState = {
        isResetPasswordLoading: false,
        isSuccessRequestResetPassword: false,
        isResetPasswordError: false,
        isResetCodeLoading: false,
        isSuccessRequestResetCode: false,
        isResetCodeError: false,
    };

    const mockResetPasswordResponse = {
        success: true,
        message: 'Password reset successfully'
    };

    const mockResetCodeResponse = {
        success: true,
        message: 'Reset code sent successfully'
    };

    describe('initial state', () => {
        it('should return the initial state', () => {
            expect(resetPasswordReducer(undefined, { type: 'unknown' })).toEqual(initialState);
        });
    });

    describe('extraReducers - resetPasswordAsync', () => {
        it('should handle resetPasswordAsync.pending', () => {
            const action = { type: resetPasswordAsync.pending.type };
            const state = resetPasswordReducer(initialState, action);

            expect(state.isResetPasswordLoading).toBe(true);
        });

        it('should handle resetPasswordAsync.fulfilled', () => {
            const action = {
                type: resetPasswordAsync.fulfilled.type,
                payload: mockResetPasswordResponse
            };
            const state = resetPasswordReducer(initialState, action);

            expect(state.isResetPasswordLoading).toBe(false);
            expect(state.isSuccessRequestResetPassword).toBe(true);
            expect(state.isResetPasswordError).toBe(false);
            expect(state.resetPasswordMessage).toBe('Password reset successfully');
        });

        it('should handle resetPasswordAsync.rejected', () => {
            const action = { type: resetPasswordAsync.rejected.type };
            const state = resetPasswordReducer(initialState, action);

            expect(state.isSuccessRequestResetPassword).toBe(false);
            expect(state.isResetPasswordLoading).toBe(false);
            expect(state.isResetPasswordError).toBe(true);
        });
    });

    describe('extraReducers - fetchResetCodeAsync', () => {
        it('should handle fetchResetCodeAsync.pending', () => {
            const action = { type: fetchResetCodeAsync.pending.type };
            const state = resetPasswordReducer(initialState, action);

            expect(state.isResetCodeLoading).toBe(true);
        });

        it('should handle fetchResetCodeAsync.fulfilled', () => {
            const action = {
                type: fetchResetCodeAsync.fulfilled.type,
                payload: mockResetCodeResponse
            };
            const state = resetPasswordReducer(initialState, action);

            expect(state.isResetCodeLoading).toBe(false);
            expect(state.isSuccessRequestResetCode).toBe(true);
            expect(state.isResetCodeError).toBe(false);
            expect(state.resetCodeMessage).toBe('Reset code sent successfully');
        });

        it('should handle fetchResetCodeAsync.rejected', () => {
            const action = { type: fetchResetCodeAsync.rejected.type };
            const state = resetPasswordReducer(initialState, action);

            expect(state.isSuccessRequestResetCode).toBe(false);
            expect(state.isResetCodeLoading).toBe(false);
            expect(state.isResetCodeError).toBe(true);
        });
    });
});
