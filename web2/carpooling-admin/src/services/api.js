import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export const getDisputes = () => api.get('/disputes').then((res) => res.data);
export const resolveDispute = (id) => api.patch(`/disputes/${id}/resolve`).then((res) => res.data);
export const deleteDispute = (id) => api.delete(`/disputes/${id}`).then((res) => res.data);

export const getUsers = () => api.get('/users').then((res) => res.data);

export const getMessages = () => api.get('/messages').then((res) => res.data);
export const createMessage = (content, isAdmin) => api.post('/messages', { content, isAdmin }).then((res) => res.data);

export default api;


// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers['x-auth-token'] = token;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error);
//     return Promise.reject(error);
//   }
// );

// export default api;


