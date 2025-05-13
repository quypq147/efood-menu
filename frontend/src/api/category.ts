
import { axiosInstance } from '@/lib/axios';



// Lấy danh sách danh mục
export const getCategories = async () => {
  const response = await axiosInstance.get('/category');
  return response.data;
};

// Thêm danh mục mới
export const addCategory = async (data: { name: string }) => {
  const response = await axiosInstance.post('/category', data);
  return response.data;
};

// Cập nhật danh mục
export const updateCategory = async (id: number, data: { name: string }) => {
  const response = await axiosInstance.put(`/category/${id}`, data);
  return response.data;
};

// Xóa danh mục
export const deleteCategory = async (id: number) => {
  const response = await axiosInstance.delete(`/category/${id}`);
  return response.data;
};