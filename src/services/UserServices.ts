import { api } from './api';
import User from '@interfaces/User';

interface IRegisterRequest {
  phone: string;
}

interface IVerifyCodeRequest {
  phone: string;
  code: number;
}

// interface IAddContact {
//   userPhone: string;
//   phone?: string;
//   name: string;
//   email?: string;
// }

interface ISendLinkRequest {
  link: string;
  pseudoUserId: string;
}

export interface IDeleteUserRequest {
  phone: string;
}

interface IGetUserRequest {
  phone?: string;
  email?: string;
}

interface IAvailabilityRequest {
  id: string;
  inviteId: string;
}

interface IUpdateStateRequest {
  state: string;
  email: string;
  inviteId: string;
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
        data: {
          phone: data.phone,
        },
      });
      return reponse.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async addNameAndImage(data: FormData): Promise<User> {
    try {
      const response = await api.post('/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
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

  static async sendSignUpLink(data: ISendLinkRequest): Promise<string> {
    try {
      const response = await api.post('/SendSignUpLink', {
        link: data.link,
        pseudoUserId: data.pseudoUserId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async isPossibleMandatoryUser({
    phone,
    email,
  }: IGetUserRequest): Promise<boolean> {
    try {
      if (phone && phone !== '') {
        const response = await api.get(`/GetUserByPhone/${phone}`);
        return response.data.calendar_found;
      } else if (email !== '') {
        const response = await api.get(`/GetUserByEmail/${email}`);
        return response.data.calendar_found;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async checkUserAvailability({
    id,
    inviteId,
  }: IAvailabilityRequest): Promise<boolean> {
    try {
      const response = await api.post('/checkUserAvailability', {
        id,
        inviteId,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async resendCode(phone: string): Promise<void> {
    try {
      await api.post('/resendCode', {
        phone,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateInviteState({
    state,
    email,
    inviteId,
  }: IUpdateStateRequest): Promise<void> {
    try {
      await api.post('/invites/updateInviteState', {
        state,
        email,
        inviteId,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
