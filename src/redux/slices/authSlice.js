import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../api/axiosInstance';

// =========================
// LOGIN
// =========================
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/login', {
        email,
        password,
      });

      console.log('LOGIN SUCCESS RESPONSE =>', response.data);

      const data = response.data?.data || response.data;

      const token =
        data?.token || data?.accessToken || data?.access_token || null;

      const user =
        data?.user || data?.userDetails || data?.employee || data || null;

      if (token) {
        await AsyncStorage.setItem('token', token);
      }

      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
      }

      return {
        token,
        user,
      };
    } catch (error) {
      console.log('LOGIN ERROR =>', error?.response?.data || error.message);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Login failed';

      return rejectWithValue(message);
    }
  },
);

// =========================
// FORGOT PASSWORD
// =========================
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/forgot-password', {
        email,
      });

      console.log('FORGOT PASSWORD RESPONSE =>', response.data);
      return response.data;
    } catch (error) {
      console.log(
        'FORGOT PASSWORD ERROR =>',
        error?.response?.data || error.message,
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Failed to verify email';

      return rejectWithValue(message);
    }
  },
);

// =========================
// RESET PASSWORD
// =========================
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, code, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/user/reset-password', {
        email,
        code,
        password,
        confirmPassword,
      });

      console.log('RESET PASSWORD RESPONSE =>', response.data);
      return response.data;
    } catch (error) {
      console.log(
        'RESET PASSWORD ERROR =>',
        error?.response?.data || error.message,
      );

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        'Reset password failed';

      return rejectWithValue(message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isLoggedIn: false,

    forgotPasswordLoading: false,
    forgotPasswordSuccess: false,

    resetPasswordLoading: false,
    resetPasswordSuccess: false,
  },
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('user');
    },

    clearError: state => {
      state.error = null;
    },

    resetForgotPasswordState: state => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordSuccess = false;
    },

    resetResetPasswordState: state => {
      state.resetPasswordLoading = false;
      state.resetPasswordSuccess = false;
    },
  },
  extraReducers: builder => {
    builder
      // LOGIN
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })

      // FORGOT PASSWORD
      .addCase(forgotPassword.pending, state => {
        state.forgotPasswordLoading = true;
        state.error = null;
        state.forgotPasswordSuccess = false;
      })
      .addCase(forgotPassword.fulfilled, state => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.error = action.payload || 'Something went wrong';
        state.forgotPasswordSuccess = false;
      })

      // RESET PASSWORD
      .addCase(resetPassword.pending, state => {
        state.resetPasswordLoading = true;
        state.error = null;
        state.resetPasswordSuccess = false;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.resetPasswordLoading = false;
        state.resetPasswordSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.error = action.payload || 'Something went wrong';
        state.resetPasswordSuccess = false;
      });
  },
});

export const {
  logout,
  clearError,
  resetForgotPasswordState,
  resetResetPasswordState,
} = authSlice.actions;

export default authSlice.reducer;
