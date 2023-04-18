import axios from 'axios';

const baseURL = 'https://tmdb-server.onrender.com'

const config = {
  baseURL,
  withCredentials: true,
};

export const instance = axios.create(config);

export const fetchApi = ({ method, url, body }) => instance[method](url, body);
