import apiClient from './apiClient';

export const getLeaveList = async employeeId => {
  try {
    const response = await apiClient.get(`/api/leaves/${employeeId}`);
    return response.data;
  } catch (error) {
    console.log('Leave List API Error:', error?.response || error);
    return [];
  }
};

export const addLeave = async payload => {
  try {
    const response = await apiClient.post(`/api/leaves/apply`, payload);
    return response.data;
  } catch (error) {
    console.log('Add Leave API Error:', error?.response || error);
    throw error;
  }
};

export const getLeaveCount = async employeeId => {
  try {
    const response = await apiClient.get(`/api/leaves/count/${employeeId}`);
    return response.data;
  } catch (error) {
    console.log('Leave Count API Error:', error?.response || error);
    return { totalLeaves: 0 };
  }
};
