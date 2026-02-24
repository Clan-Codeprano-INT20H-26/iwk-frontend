import { api } from './authAxiosInstance';
import type { User } from '@/types/user';
import { setCookie } from '@/lib/utils/setCookie';
import {
  rememberMeSessionMaxAge,
  sessionMaxAge,
} from '@/constants/sessionMaxAge';

interface UserResponse extends User {
  token: string;
}

export class AuthService {
  private static instance: AuthService;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }
    AuthService.instance = this;
  }

  async login(
    email: string,
    password: string,
    isRememberMe: boolean
  ): Promise<User> {
    const { data } = await api.post<UserResponse>('/login', {
      email,
      password,
    });
    setCookie(
      'token',
      data.token,
      isRememberMe ? rememberMeSessionMaxAge : sessionMaxAge
    );
    return data;
  }

  async register(
    email: string,
    password: string,
    username: string
  ): Promise<User> {
    const { data } = await api.post<UserResponse>('/register', {
      email,
      password,
      username,
    });
    setCookie('token', data.token);
    return data;
  }

  async logout(): Promise<void> {
    await api.post('/logout');
  }
}
