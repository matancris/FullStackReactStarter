import { httpService } from './http.service';

export const authService = {
  async login(credentials) {
    try {
      const response = await httpService.post('/api/auth/signin', { data: credentials });
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response.user;
    } catch (error) {
      throw error;
    }
  },

  async register(userData) {
    try {
      const response = await httpService.post('/api/auth/signup', { data: userData });
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response.user;
    } catch (error) {
      throw error;
    }
  },

  async googleSignIn() {
    try {
      window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
      return null;
    } catch (error) {
      throw error;
    }
  },

  async logout() {
    try {
      await httpService.post('/api/auth/logout');
      localStorage.removeItem('token');
    } catch (error) {
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const user = await httpService.get('/api/auth/currUser');
      return user;
    } catch (error) {
      throw error;
    }
  },

  getToken() {
    return localStorage.getItem('token');
  }
}; 