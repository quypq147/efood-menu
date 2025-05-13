import { axiosInstance } from "@/lib/axios";
// Tạo một instance của axios với cấu hình cơ bản

// Lấy danh sách món ăn
export const getFoods = async () => {
  const response = await axiosInstance.get("/food");
  return response.data;
};

// Thêm món ăn mới
export const addFood = async (data: {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  categoryId: number;
}) => {
  const response = await axiosInstance.post("/food", data);
  return response.data;
};

// Cập nhật món ăn
export const updateFood = async (
  id: number,
  data: Partial<{
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    categoryId: number;
  }>
) => {
  const response = await axiosInstance.patch(`/food/${id}`, data);
  return response.data;
};

// Xóa món ăn
export const deleteFood = async (id: number) => {
  const response = await axiosInstance.delete(`/food/${id}`);
  return response.data;
};
