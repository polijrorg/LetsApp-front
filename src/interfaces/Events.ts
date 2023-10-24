export default interface Event {
  element: {
    id: string;
    name: string;
    begin: Date;
    end: string;
    description: string;
    phone: string;
    address: string;
    link: string;
    state: 'accepted' | 'declined' | 'needsAction';
    googleId: string;
    organizerPhoto: string;
    organizerName: string;
  };
  maybe: number;
  no: number;
  status: number;
  yes: number;
}
