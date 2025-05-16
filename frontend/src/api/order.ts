import { axiosInstance } from "../lib/axios";

export interface OrderItemPayload {
  foodId: number;
  quantity: number;
  price: number;
  note?: string;
}

export interface CreateOrderPayload {
  orderNumber: string;
  serveType: string;
  total: number;
  items: OrderItemPayload[];
  userId?: number;
}

export async function createOrder(orderData: CreateOrderPayload) {
  const res = await axiosInstance.post('/orders', orderData);
  if (res.status !== 201) throw new Error('Tạo đơn hàng thất bại');
  return res.data;
}
export async function fetchOrders() {
  const res = await axiosInstance.get('/orders');
  return res.data;
}
export async function updateOrderStatus(orderId: number, status: string) {
  const res = await axiosInstance.patch(`/orders/${orderId}/status`, { status });
  return res.data;
}

