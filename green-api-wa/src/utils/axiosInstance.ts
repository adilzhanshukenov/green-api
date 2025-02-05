import axios from 'axios';
import accountStore from '../stores/accountStore/AccountStore';

let API_URL: string = "";
API_URL = accountStore.apiUrl;

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 3000, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;