'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchOrders, updateOrderStatus } from '@/api/order';

ChartJS.register(ArcElement, Tooltip, Legend);

// Hàm chuyển trạng thái sang tiếng Việt
function getStatusLabel(status) {
  switch (status) {
    case 'COMPLETED':
      return 'Hoàn thành';
    case 'PENDING':
      return 'Chờ xử lý';
    case 'CANCELLED':
      return 'Đã hủy';
    default:
      return status;
  }
}

// Component hiển thị thống kê
function StatCard({ label, value, change }) {
  return (
    <motion.div
      className="p-4 bg-[#2a2a3c] rounded-lg shadow transition-transform transform hover:scale-105"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm text-gray-400">{label}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </p>
    </motion.div>
  );
}

// Component hiển thị bảng đơn hàng với dropdown đổi trạng thái
function OrderTable({ orders, onStatusChange }) {
  return (
    <motion.div
      className="bg-[#2a2a3c] rounded-lg p-4 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-400">
            <th className="py-2">Khách</th>
            <th className="py-2">Thực đơn</th>
            <th className="py-2">Thanh toán</th>
            <th className="py-2">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id || index} className="border-t border-gray-700 hover:bg-[#333347] transition-colors">
              <td className="py-2">{order.customer}</td>
              <td className="py-2">{order.menu}</td>
              <td className="py-2">{order.payment}</td>
              <td className="py-2">
                <select
                  value={order.status}
                  onChange={e => onStatusChange(order.id, e.target.value)}
                  className="bg-[#232336] text-white rounded px-2 py-1"
                >
                  <option value="PENDING">Chờ xử lý</option>
                  <option value="COMPLETED">Hoàn thành</option>
                  <option value="CANCELLED">Đã hủy</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

// Component hiển thị loại đơn hàng với biểu đồ
function OrderTypeChart({ orderTypes }) {
  const pieData = {
    labels: orderTypes.map((type) => type.type),
    datasets: [
      {
        data: orderTypes.map((type) => type.customers),
        backgroundColor: orderTypes.map((type) => type.color),
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div
      className="bg-[#2a2a3c] rounded-lg p-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Pie data={pieData} />
    </motion.div>
  );
}

// Main Dashboard Component
export default function DashBoard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('Today');
  const [now, setNow] = useState("");

  useEffect(() => {
    fetchOrders()
      .then(data => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setNow(
      new Date().toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        weekday: "long",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      })
    );
  }, []);

  // Tổng doanh thu
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  // Tổng số món đã đặt
  const totalDishes = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + (i.quantity || 0), 0),
    0
  );

  // Tổng số khách hàng (distinct userId, nếu userId null thì tính là khách vãng lai)
  const customerIds = new Set(orders.map(o => o.userId || 'guest'));
  const totalCustomers = customerIds.size;

  // Loại hình thức đơn hàng
  const orderTypes = [
    {
      type: 'Ăn đây',
      customers: orders.filter(o => o.serverType === 'dine-in' || o.serveType === 'dine-in').length,
      color: '#ff6b5c',
    },
    {
      type: 'Mang đi',
      customers: orders.filter(o => o.serverType === 'to-go' || o.serveType === 'to-go').length,
      color: '#4f46e5',
    },
    {
      type: 'Giao hàng',
      customers: orders.filter(o => o.serverType === 'delivery' || o.serveType === 'delivery').length,
      color: '#22c55e',
    },
  ];

  // Dữ liệu cho bảng đơn hàng
  const orderTableData = orders.map(order => ({
    id: order.id,
    customer: order.user?.name || 'Khách vãng lai',
    menu: order.items.map(i => i.food?.name || '').join(', '),
    payment: order.total?.toLocaleString('vi-VN') + '₫',
    status: order.status,
  }));

  const stats = [
    { label: 'Tổng doanh thu', value: totalRevenue.toLocaleString('vi-VN') + '₫', change: '+0%' },
    { label: 'Tổng số món đã đặt', value: totalDishes, change: '+0%' },
    { label: 'Tổng số khách hàng', value: totalCustomers, change: '+0%' },
  ];

  // Xử lý đổi trạng thái
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders =>
        orders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      alert('Cập nhật trạng thái thất bại!');
    }
  };

  return (
    <div className="p-7 text-white min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Header */}
      <motion.div
        className="col-span-1 lg:col-span-3 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Bảng điều khiển</h1>
        <p className="text-gray-400">{now}</p>
      </motion.div>

      {/* Stats */}
      <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} label={stat.label} value={stat.value} change={stat.change} />
        ))}
      </div>

      {/* Order Report */}
      <div className="col-span-1 lg:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Báo cáo đơn hàng</h2>
          <button className="px-4 py-2 bg-[#2a2a3c] text-gray-400 rounded-lg">Lọc đơn hàng</button>
        </div>
        {loading ? (
          <div className="text-center py-8 text-gray-400">Đang tải dữ liệu...</div>
        ) : (
          <OrderTable orders={orderTableData} onStatusChange={handleStatusChange} />
        )}
      </div>

      {/* Most Type of Order */}
      <div className="col-span-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Loại hình thức đơn hàng</h2>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-[#2a2a3c] text-gray-400 px-4 py-2 rounded-lg"
          >
            <option value="Today">Hôm nay</option>
            <option value="This Week">Tuần này</option>
            <option value="This Month">Tháng này</option>
          </select>
        </div>
        <OrderTypeChart orderTypes={orderTypes} />
      </div>
    </div>
  );
}