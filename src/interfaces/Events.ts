import User, { PseudoUser } from './User';

export default interface Event {
  element: EventElement;
  maybe: EventStatus;
  no: EventStatus;
  yes: EventStatus;
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
