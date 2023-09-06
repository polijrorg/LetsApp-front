export default interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  photo: string;
  code: string;
  googleRefeshCode: string;
  microsoftRefeshCode: string;
  created_at: Date;
  updated_at: Date;
  tokens: string;
}

export default interface Profile {
  user: User;
  calendar_found: boolean;
}
