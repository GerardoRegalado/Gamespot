import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.cheapshark.com/api/1.0',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
