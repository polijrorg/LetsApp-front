import { api } from './api';
import Event from '@interfaces/Events';
import Invite from '@interfaces/Invites';
import PseudoGuest from '@interfaces/PseudoGuest';
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

interface ICreateEvent {
  phone: string;
  begin: string;
  end: string;
  beginSearch: string;
  endSearch: string;
  attendees: string[];
  description: string;
  address: string;
  createMeetLink: boolean;
  name: string;
  optionalAttendees: string[];
}

interface ICreateEventResponse {
  id: string;
  name: string;
  begin: string;
  end: string;
  beginSearch: string;
  endSearch: string;
  description: string;
  phone: string;
  address: string;
  link: string;
  state: 'accepted' | 'declined' | 'needsAction';
  googleId: string;
  organizerPhoto: string;
  organizerName: string;
  pseudoGuests: PseudoGuest[];
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

  static async createGoogleEvent(
    data: ICreateEvent
  ): Promise<ICreateEventResponse> {
    const response = await api.post('/createGoogleEvent', {
      name: data.name,
      phone: data.phone,
      begin: data.begin,
      attendees: data.attendees,
      end: data.end,
      address: data.address,
      description: data.description,
      createMeetLink: data.createMeetLink,
      optionalAttendees: data.optionalAttendees,
      beginSearch: data.beginSearch,
      endSearch: data.endSearch,
    });
    return response.data;
  }

  static async createOutlookEvent(
    data: ICreateEvent
  ): Promise<ICreateEventResponse> {
    const response = await api.post('/createOutlookEvent', {
      name: data.name,
      phone: data.phone,
      begin: data.begin,
      attendees: data.attendees,
      end: data.end,
      address: data.address,
      description: data.description,
      createMeetLink: data.createMeetLink,
      optionalAttendees: data.optionalAttendees,
      beginSearch: data.beginSearch,
      endSearch: data.endSearch,
    });
    return response.data;
  }
}
