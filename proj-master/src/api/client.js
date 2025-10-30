import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

client.interceptors.response.use(
  (resp) => resp,
  (err) => {
    if (err.response) {
      console.error('API error', err.response.status, err.response.data);
    } else {
      console.error('Network error', err.message);
    }
    return Promise.reject(err);
  }
);

export default client;
