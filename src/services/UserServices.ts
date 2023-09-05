import { api } from './api';
import { User } from '@interfaces/User';
import { AxiosResponse } from 'axios';
import { setCookie, destroyCookie } from 'nookies';

interface IRegisterRequest {
  phone: string;
}

export default class UserServices {
  static async register(data: IRegisterRequest): Promise<User> {
    try {
      const response: AxiosResponse<User> = await api.post('/register', data);

      // setCookie(undefined, '@letsApp:token', response.data.token);
      // setCookie(undefined, '@letsApp:userId', response.data.user.id);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static logout() {
    destroyCookie(undefined, '@letsApp:token');
    destroyCookie(undefined, '@letsApp:userId');
  }

  static async getUserById(id: string): Promise<User> {
    const response = await api.get(`/GetUserById/${id}`);

    return response.data;
  }
}
