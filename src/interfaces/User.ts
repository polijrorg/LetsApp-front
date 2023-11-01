export default interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  code: string;
  created_at: Date;
  updated_at: Date;
  tokens: string;
  type: 'GOOGLE' | 'OUTLOOK';
}

export interface PseudoUser {
  pseudoUserId: string;
  email?: string;
  phone?: string;
}
