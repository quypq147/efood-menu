import { axiosInstance } from '@/lib/axios';

export const fetchCurrentUser = async () => {
  const res = await axiosInstance.get('/users/me', { withCredentials: true });

  return res.data;
};

export const updateCurrentUser = async (data: {
  name?: string;
  phoneNumber?: string;
  address?: string;
  birthDate?: string;
}) => {
  const res = await axiosInstance.patch('/users/me', data, { withCredentials: true });
  console.log(res.data);
  return res.data;
};
