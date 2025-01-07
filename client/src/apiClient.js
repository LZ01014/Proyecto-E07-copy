import axios from 'axios';
import './assets/styles.css';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL, // Utiliza la variable de entorno para la URL del backend
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
