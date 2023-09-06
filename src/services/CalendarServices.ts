import { api } from './api';
import User from '@interfaces/User';

interface IAddContact {
  userPhone: string;
  phone: string;
  name: string;
  email: string;
}

export interface IDeleteUserRequest {
  phone: string;
}

export default class CalendarServices {
  static async addContact(data: IAddContact): Promise<User> {
    const response = await api.post('addContact', {
      userPhone: data.userPhone,
      phone: data.phone,
      name: data.name,
      email: data.email,
    });

    return response.data;
  }
}
