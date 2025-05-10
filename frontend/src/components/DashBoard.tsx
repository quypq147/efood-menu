'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

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

// Component hiển thị bảng đơn hàng
function OrderTable({ orders }) {
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
            <th className="py-2">Customer</th>
            <th className="py-2">Menu</th>
            <th className="py-2">Payment</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="border-t border-gray-700 hover:bg-[#333347] transition-colors">
              <td className="py-2">{order.customer}</td>
              <td className="py-2">{order.menu}</td>
              <td className="py-2">{order.payment}</td>
              <td className="py-2">
                <span
                  className={`px-2 py-1 rounded ${
                    order.status === 'Completed'
                      ? 'bg-green-500'
                      : order.status === 'Preparing'
                      ? 'bg-blue-500'
                      : 'bg-yellow-500'
                  }`}
                >
                  {order.status}
                </span>
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
  const [timeFilter, setTimeFilter] = useState('Today');

  const stats = [
    { label: 'Total Revenue', value: '$10,243.00', change: '+2.40%' },
    { label: 'Total Dish Ordered', value: '23,456', change: '-2.40%' },
    { label: 'Total Customer', value: '1,234', change: '+2.40%' },
  ];

  const orders = [
    { customer: 'Eren Jaeger', menu: 'Spicy seasoned seafood noodles', payment: '$125', status: 'Completed' },
    { customer: 'Reiner Braun', menu: 'Salted Pasta with mushroom sauce', payment: '$145', status: 'Preparing' },
    { customer: 'Levi Ackerman', menu: 'Beef dumpling in hot and sour soup', payment: '$105', status: 'Pending' },
    { customer: 'Historia Reiss', menu: 'Hot spicy fried rice with omelet', payment: '$45', status: 'Completed' },
    { customer: 'Hanji Zoe', menu: 'Hot spicy fried rice with omelet', payment: '$245', status: 'Completed' },
  ];

  const orderTypes = [
    { type: 'Dine In', customers: 200, color: '#ff6b5c' },
    { type: 'To Go', customers: 122, color: '#4f46e5' },
    { type: 'Delivery', customers: 284, color: '#22c55e' },
  ];

  return (
    <div className="p-6  text-white min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Header */}
      <motion.div
        className="col-span-1 lg:col-span-3 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Bảng điều khiển</h1>
        <p className="text-gray-400">Tuesday, 2 Feb, 2021</p>
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
        <OrderTable orders={orders} />
      </div>

      {/* Most Type of Order */}
      <div className="col-span-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Most Type of Order</h2>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-[#2a2a3c] text-gray-400 px-4 py-2 rounded-lg"
          >
            <option value="Today">Today</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
          </select>
        </div>
        <OrderTypeChart orderTypes={orderTypes} />
      </div>
    </div>
  );
}