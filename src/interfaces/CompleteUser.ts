import Contacts from './Contacts';

export default interface CompleteUser {
  user: {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo: string;
    code: string;
    contatos: Contacts[];
    created_at: Date;
    updated_at: Date;
    tokens: string;
    type: 'GOOGLE' | 'OUTLOOK';
  };
  calendar_found: boolean;
}
