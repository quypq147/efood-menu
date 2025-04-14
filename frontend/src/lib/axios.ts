import axios from 'axios';

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:30';

export const axiosInstance = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});