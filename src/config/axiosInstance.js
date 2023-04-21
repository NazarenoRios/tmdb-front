import axios from 'axios';

const baseURL =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://tmdb-server.onrender.com'
    : 'http://localhost:8080';

const config = {
  baseURL,
  withCredentials: true,
};

export const instance = axios.create(config);

export const fetchApi = ({ method, url, body, headers }) =>
  instance.request({
    url,
    method,
    headers,
    data: body,
  });