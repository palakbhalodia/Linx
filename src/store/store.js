import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import personalReducer from './personal/personalSlice';
import employmentReducer from './employment/employmentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    personal: personalReducer,
    employment: employmentReducer,
  },
});
