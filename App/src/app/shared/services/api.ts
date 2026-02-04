import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://cristorey.takysoft.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 🔍 INTERCEPTOR DE REQUEST
api.interceptors.request.use(
  (config) => {
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log('➡️ REQUEST:', config.method?.toUpperCase(), fullUrl);
    console.log('➡️ DATA:', config.data);
    console.log('➡️ HEADERS:', config.headers);
    return config;
  },
  (error) => {
    console.log('❌ REQUEST ERROR:', error);
    return Promise.reject(error);
  },
);

// 🔍 INTERCEPTOR DE RESPONSE
api.interceptors.response.use(
  (response) => {
    console.log('✅ RESPONSE:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log('❌ RESPONSE ERROR STATUS:', error.response?.status);
    console.log('❌ RESPONSE ERROR URL:',
      `${error.config?.baseURL}${error.config?.url}`,
    );
    console.log('❌ RESPONSE ERROR DATA:', error.response?.data);
    return Promise.reject(error);
  },
);
