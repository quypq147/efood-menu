'use client';

export default function OrderPage({ cart, onUpdateCart, onRemoveItem, onCheckout }) {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="p-6 bg-[#252836] text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Orders #{Math.floor(Math.random() * 100000)}</h1>

      {/* Danh sách món ăn trong giỏ hàng */}
      <div className="bg-[#2a2a3c] rounded-lg p-4 mb-6">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-400">
              <th className="py-2">Tên món</th>
              <th className="py-2">Số lượng</th>
              <th className="py-2">Giá</th>
              <th className="py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-2">{item.name}</td>
                <td className="py-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onUpdateCart(item.id, parseInt(e.target.value))}
                    className="w-16 bg-[#2a2a3c] text-white border border-gray-600 rounded"
                  />
                </td>
                <td className="py-2">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="py-2">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Gỡ bỏ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tổng tiền */}
      <div className="flex justify-between items-center mb-6">
        <p className="text-lg font-bold">Tổng cộng: {Number(calculateTotal()).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
        <button
          onClick={onCheckout}
          className="px-4 py-2 bg-[#ff6b5c] text-white rounded-lg"
        >
          Tiếp đến thanh toán
        </button>
      </div>
    </div>
  );
}
