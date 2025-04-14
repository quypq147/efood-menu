import { axiosInstance } from '@/lib/axios';

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post('/auth/login', data, {
    withCredentials: true,
  });
  return res.data;
};

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axiosInstance.post('/auth/register', data);
  return res.data;
};

export const logoutUser = async () => {
  await axiosInstance.post('/auth/logout', {}, { withCredentials: true });
};
