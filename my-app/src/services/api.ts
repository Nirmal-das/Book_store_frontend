import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const bookService = {
  getAllBooks: () => api.get('/books/list'),
  getBookById: (id: string) => api.get(`/books/${id}`),
  createBook: (data: any) => api.post('/books/create', data),
  updateBook: (id: string, data: any) => api.put(`/books/${id}`, data),
  deleteBook: (id: string) => api.delete(`/books/${id}`),
};

export const authService = {
  login: (credentials: { username: string; password: string }) => 
    api.post('/auth/login', credentials),
  register: (userData: { name: string; username: string; email: string; password: string }) => 
    api.post('/auth/register', userData),
};

export default api; 