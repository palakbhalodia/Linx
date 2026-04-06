import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: 'https://stagingapi.linxap.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  async config => {
    try {
      const token = null;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log('================ API REQUEST ================');
      console.log('BASE URL:', config.baseURL);
      console.log('ENDPOINT:', config.url);
      console.log('FULL URL:', `${config.baseURL}${config.url}`);
      console.log('METHOD:', config.method?.toUpperCase());
      console.log('HEADERS:', config.headers);
      console.log('PARAMS:', config.params || {});
      console.log('DATA:', config.data || {});
      console.log('============================================');
    } catch (error) {
      console.log('Request Interceptor Error:', error);
    }

    return config;
  },
  error => Promise.reject(error),
);

apiClient.interceptors.response.use(
  response => {
    console.log('================ API RESPONSE ================');
    console.log('URL:', response.config.url);
    console.log('STATUS:', response.status);
    console.log('DATA:', response.data);
    console.log('=============================================');
    return response;
  },
  error => {
    console.log('================ API ERROR ===================');
    console.log('URL:', error?.config?.url);
    console.log('METHOD:', error?.config?.method?.toUpperCase());
    console.log('STATUS:', error?.response?.status);
    console.log('ERROR DATA:', error?.response?.data);
    console.log('MESSAGE:', error?.message);
    console.log('=============================================');

    return Promise.reject(error);
  },
);

export default apiClient;
