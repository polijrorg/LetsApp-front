import { api } from './api';
import Event from '@interfaces/Events';
import Invite from '@interfaces/Invites';
import SuggestedTimes from '@interfaces/SuggestedTimes';
import User from '@interfaces/User';

interface IAddContact {
  userPhone: string;
  phone: string;
  name: string;
  email: string;
}

interface IGetRecommendedTime {
  phone: string;
  beginDate: string;
  beginHour: string;
  duration: number;
  endDate: string;
  endHour: string;
  mandatoryGuests: string[];
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

  static async getUserEvents(email: string): Promise<Event[]> {
    const response = await api.post('invites/listEventsByUser', {
      email,
    });

    return response.data;
  }

  static async getUserInvites(email: string): Promise<Invite[]> {
    const response = await api.post('invites/listInvitesByUser', {
      email,
    });

    return response.data;
  }

  static async getGoogleUrl(phone: string): Promise<string> {
    const response = await api.post(`/getGoogleAuthUrl/${phone}`);
    return response.data;
  }

  static async getRecommendedTime(
    data: IGetRecommendedTime
  ): Promise<SuggestedTimes> {
    console.log({
      phone: data.phone,
      beginDate: data.beginDate,
      beginHour: data.beginHour,
      duration: data.duration,
      endDate: data.endDate,
      endHour: data.endHour,
      mandatoryGuests: data.mandatoryGuests,
    });
    const response = await api.post('/getRecommededTimes', {
      phone: data.phone,
      beginDate: data.beginDate,
      beginHour: data.beginHour,
      duration: data.duration,
      endDate: data.endDate,
      endHour: data.endHour,
      mandatoryGuests: data.mandatoryGuests,
    });
    return response.data;
  }
}
