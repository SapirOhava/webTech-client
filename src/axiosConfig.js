import axios from 'axios';
import { store } from './store';
import { setError } from './slices/errorSlice';

const API_URL = process.env.REACT_APP_API_URL;

const apiAxios = axios.create({
  baseURL: API_URL,
});

apiAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    store.dispatch(setError(errorMessage));
    return Promise.reject(error);
  }
);

export default apiAxios;
