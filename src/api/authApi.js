import { apiClient } from './client';

/**
 * Mock Login API
 */
export const loginApi = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({
          user: { email },
          token: 'mock-jwt-token-12345',
        });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000); // 1s delay
  });
};

/**
 * Mock Forgot Password API
 */
export const forgotPasswordApi = async (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email) {
        resolve({
          message: 'Reset instructions sent to your email.',
        });
      } else {
        reject(new Error('Email is required'));
      }
    }, 1000);
  });
};

/**
 * Real Reset Password API (Verify Token)
 */
export const resetPasswordApi = async (email, code, newPassword) => {
  // We send the code as a path parameter per swagger spec
  // We include newPassword and email in the body for the actual password reset process
  return apiClient(`/candidate-auth/verify-token/${encodeURIComponent(code)}`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password: newPassword,
    }),
  });
};
