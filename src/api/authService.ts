import type { User } from '@/types/user';
import { api } from './authAxiosInstance';
import { setCookie } from '@/lib/utils/setCookie';

export class AuthService {
  private static instance: AuthService;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }
    AuthService.instance = this;
  }

  async login(email: string, password: string): Promise<User> {
    const { data } = await api.post<User>('/login', { email, password });
    setCookie('token', data.accessToken);
    return data;
  }

  async register(
    email: string,
    password: string,
    username: string
  ): Promise<User> {
    const { data } = await api.post<User>('/register', {
      email,
      password,
      username,
    });
    setCookie('token', data.accessToken);
    return data;
  }

  async logout(): Promise<void> {
    await api.post('/logout');
  }
}
