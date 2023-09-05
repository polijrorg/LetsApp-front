import { api } from './api';
import { User } from '@interfaces/User';
import { setCookie, destroyCookie } from 'nookies';

interface IRegisterRequest {
  phone: string;
}

interface IVerifyCodeRequest {
  phone: string;
  code: number;
}

interface IDeleteUserRequest {
  phone: string;
}

export default class UserServices {
  static async register(data: IRegisterRequest): Promise<User> {
    try {
      const response = await api.post('/register', data);

      // setCookie(undefined, '@letsApp:token', response.data.token);
      // setCookie(undefined, '@letsApp:userId', response.data.user.id);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(data: IDeleteUserRequest): Promise<User> {
    try {
      const reponse = await api.delete('/deleteUser', {
        phone: data.phone,
      });
      return reponse.data;
    } catch (error) {
      console.log(error);
    }

    destroyCookie(undefined, '@letsApp:token');
    destroyCookie(undefined, '@letsApp:userId');
  }

  static async getUserById(id: string): Promise<User> {
    const response = await api.get(`/GetUserById/${id}`);

    return response.data;
  }

  static async verifyCode(data: IVerifyCodeRequest): Promise<User> {
    try {
      const response = await api.post('/verify', {
        code: data.code,
        phone: data.phone,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
