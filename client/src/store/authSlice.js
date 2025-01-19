import { createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/auth.service';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token')
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  }
});

export const { startLoading, loginSuccess, loginFailure, logout } = authSlice.actions;

// Async actions
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const user = await authService.login(credentials);
    dispatch(loginSuccess(user));
    return { success: true };
  } catch (error) {
    dispatch(loginFailure(error));
    return { error };
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const user = await authService.register(userData);
    dispatch(loginSuccess(user));
    return { success: true };
  } catch (error) {
    dispatch(loginFailure(error));
    return { error };
  }
};

export const googleSignIn = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    await authService.googleSignIn();
    // Note: The actual user data will be handled by the OAuth callback
    return { success: true };
  } catch (error) {
    dispatch(loginFailure(error));
    return { error };
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await authService.logout();
    dispatch(logout());
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { error };
  }
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const user = await authService.getCurrentUser();
    dispatch(loginSuccess(user));
    return { success: true };
  } catch (error) {
    dispatch(loginFailure(error));
    return { error };
  }
};

export default authSlice.reducer; 