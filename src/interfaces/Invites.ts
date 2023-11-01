export default interface Invite {
  element: {
    address: string;
    begin: Date;
    description: string;
    end: Date;
    googleId: string;
    id: string;
    link: string;
    name: string;
    organizerName: string;
    organizerPhoto: string;
    phone: string;
    state: 'accepted' | 'declined' | 'needsAction';
  };
  maybe: number;
  no: number;
  status: number;
  yes: number;
}
