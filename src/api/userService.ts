import { api } from './authAxiosInstance';
import type { User } from '@/types/user';
import { setCookie } from '@/lib/utils/setCookie';
import {
  rememberMeSessionMaxAge,
  sessionMaxAge,
} from '@/constants/sessionMaxAge';

interface UserResponse {
  token: string;
  user: User;
}

export class UserService {
  private static instance: UserService;

  constructor() {
    if (UserService.instance) {
      return UserService.instance;
    }
    UserService.instance = this;
  }

  async login(
    email: string,
    password: string,
    isRememberMe: boolean
  ): Promise<User> {
    const { data } = await api.post<UserResponse>('/auth/login', {
      email,
      password,
    });
    setCookie(
      'token',
      data.token,
      isRememberMe ? rememberMeSessionMaxAge : sessionMaxAge
    );
    return data.user;
  }

  async register(
    email: string,
    password: string,
    username: string
  ): Promise<User> {
    const { data } = await api.post<UserResponse>('/auth/register', {
      email,
      password,
      username,
    });
    setCookie('token', data.token, sessionMaxAge);
    return data.user;
  }

  async getUser(): Promise<User> {
    const { data: user } = await api.get<User>('/auth/profile');
    return user;
  }
}
