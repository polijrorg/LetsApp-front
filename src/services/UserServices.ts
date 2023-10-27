import { api } from './api';
import User, { PseudoUser } from '@interfaces/User';

interface IRegisterRequest {
  phone: string;
}

interface IVerifyCodeRequest {
  phone: string;
  code: number;
}

export interface IAddContact {
  userPhone: string;
  phone?: string;
  name: string;
  email?: string;
}

export interface IDeleteUserRequest {
  phone: string;
}

interface ISendLinkRequest {
  link: string;
  pseudoUserId: string;
}

export interface ICreateEventRequest {
  prefix: string;
  phone: string;
  begin: string;
  end: string;
  beginSearch: string;
  endSearch: string;
  name: string;
  attendees: string[];
  address: string;
  description: string;
  createMeetLink: boolean;
  optionalAttendees: string[];
}

interface ICreateEventResponse extends ICreateEventRequest {
  link: string;
  state: string;
  googleId: string;
  organizerPhoto: any;
  organizerName: string;
  pseudoGuests: PseudoUser[];
  linkNotificationResponses: string[];
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

  static async addContact(data: IAddContact): Promise<User> {
    try {
      const response = await api.post('/addContact', {
        userPhone: data.userPhone,
        phone: data.phone,
        name: data.name,
        email: data.email,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async handleLinkNotification(
    link: string,
    pseudoUserId: string
  ): Promise<string> {
    try {
      const reponse = await UserServices.sendSignUpLink({
        link,
        pseudoUserId,
      });

      console.log('link notification response: ', reponse);
      return JSON.stringify(reponse);
    } catch (error) {
      console.log(error.message);
    }
  }

  static async createOutlookEvent(
    data: ICreateEventRequest
  ): Promise<ICreateEventResponse> {
    try {
      const response = await api.post('/createOutlookEvent', {
        phone: data.phone,
        begin: data.begin,
        end: data.end,
        beginSearch: data.beginSearch,
        endSearch: data.endSearch,
        name: data.name,
        attendees: data.attendees,
        address: data.address,
        description: data.description,
        createMeetLink: data.createMeetLink,
        optionalAttendees: data.optionalAttendees,
      });

      const linkNotificationResponses: string[] = [];

      console.log(response.data);
      response.data.pseudoGuests.map(async (pseudoGuest) => {
        const link = `${data.prefix}/authentication/${pseudoGuest.pseudoUserId}`;

        const linkNotificationResponse =
          await UserServices.handleLinkNotification(
            link,
            pseudoGuest.pseudoUserId
          );

        linkNotificationResponses.push(linkNotificationResponse);
      });

      return { ...response.data, linkNotificationResponses };
    } catch (error) {
      console.log(error);
    }
  }

  static async createGoogleEvent(
    data: ICreateEventRequest
  ): Promise<ICreateEventResponse> {
    try {
      const response = await api.post('/createGoogleEvent', {
        phone: data.phone,
        begin: data.begin,
        end: data.end,
        beginSearch: data.beginSearch,
        endSearch: data.endSearch,
        name: data.name,
        attendees: data.attendees,
        address: data.address,
        description: data.description,
        createMeetLink: data.createMeetLink,
        optionalAttendees: data.optionalAttendees,
      });

      const linkNotificationResponses: string[] = [];

      console.log(response.data);
      response.data.pseudoGuests.map(async (pseudoGuest) => {
        const link = `${data.prefix}/authentication/${pseudoGuest.pseudoUserId}`;

        const linkNotificationResponse =
          await UserServices.handleLinkNotification(
            link,
            pseudoGuest.pseudoUserId
          );

        linkNotificationResponses.push(linkNotificationResponse);
      });

      return { ...response.data, linkNotificationResponses };
    } catch (error) {
      console.log(error);
    }
  }
}
