import axios from 'axios';

const api = axios.create({ baseURL: 'https://letsapp.polijrinternal.com' });

export { api };
