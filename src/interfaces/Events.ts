import { google, calendar_v3 } from 'googleapis';
import User, { PseudoUser } from './User';

export interface IEventsUserResponse extends calendar_v3.Schema$Event {
    accepted?: calendar_v3.Schema$EventAttendee[]
    declined?: calendar_v3.Schema$EventAttendee[]
    tentative?:calendar_v3.Schema$EventAttendee[]
    needsAction?: calendar_v3.Schema$EventAttendee[]
}


export default interface Event {
  // element: EventElement;
  summary: string;
  maybe: EventStatus;
  no: EventStatus;
  yes: EventStatus;
  id: string;
  name: string;
  begin: Date;
  end: string;
  beginSearch: Date;
  endSearch: Date;
  description: string;
  phone: string;
  address: string;
  link: string;
  state: 'accepted' | 'declined' | 'needsAction';
  googleId: string;
  organizerPhoto: string;
  organizerName: string;
  start: Start;
}
export interface Start {
  dateTime: string;
  timeZone: string;
}
export interface EventElement {
  id: string;
  name: string;
  begin: Date;
  end: string;
  beginSearch: Date;
  endSearch: Date;
  description: string;
  phone: string;
  address: string;
  link: string;
  state: 'accepted' | 'declined' | 'needsAction';
  googleId: string;
  organizerPhoto: string;
  organizerName: string;
}

interface EventStatus {
  amount: number;
  ateendees: User[];
  pseudoAttendes: PseudoUser[];
}