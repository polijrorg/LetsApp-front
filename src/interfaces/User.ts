import Contacts from './Contacts';

export default interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  code: string;
  googleRefreshCode: string;
  created_at: Date;
  updated_at: Date;
  tokens: string;
  type: string;
  contatos: Contacts[];
}

export interface PseudoUser {
  pseudoUserId: string;
  email?: string;
  phone?: string;
  name: string;
}

export default interface Profile {
  user: User;
  calendar_found: boolean;
}
