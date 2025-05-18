'use client';

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createOrder } from "@/api/order";
import { useRouter } from "next/navigation";

export default function OrderPage({ cart, onUpdateCart, onRemoveItem, onCheckout, user }) {
  const [notes, setNotes] = useState({});
  const [orderNumber, setOrderNumber] = useState("");
  const [serveType, setServeType] = useState("dine-in");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNoteChange = (id, value) => {
    setNotes((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    setOrderNumber(Math.floor(Math.random() * 100000).toString());
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutClick = async () => {
    setLoading(true);
    try {
      await createOrder({
        orderNumber,
        serveType,
        total: calculateTotal(),
        items: cart.map(item => ({
          foodId: item.id,
          quantity: item.quantity,
          price: item.price,
          note: notes[item.id] || "",
        })),
        userId: user?.id,
      });
      router.push("/payment-success");
    } catch (err) {
      alert("Tạo đơn hàng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white min-h-screen rounded-2xl w-full max-w-[400px] mx-auto">
      <h1 className="text-xl font-bold mb-2">Orders #{orderNumber}</h1>
      <div className="mb-2 text-sm text-gray-400">
        Tổng số món: <span className="font-bold text-white">{totalItems}</span>
      </div>
      <p>Chọn hình thức phục vụ:</p>
      <div className="flex gap-2 mb-4">
        <Button
          variant={serveType === "dine-in" ? "secondary" : "ghost"}
          className={serveType === "dine-in" ? "bg-[#ff6b5c] text-white rounded-full px-4 py-1" : "text-[#ff6b5c] rounded-full px-4 py-1"}
          onClick={() => setServeType("dine-in")}
        >
          Ăn tại chỗ
        </Button>
        <Button
          variant={serveType === "to-go" ? "secondary" : "ghost"}
          className={serveType === "to-go" ? "bg-[#ff6b5c] text-white rounded-full px-4 py-1" : "text-[#ff6b5c] rounded-full px-4 py-1"}
          onClick={() => setServeType("to-go")}
        >
          Mang đi
        </Button>
        <Button
          variant={serveType === "delivery" ? "secondary" : "ghost"}
          className={serveType === "delivery" ? "bg-[#ff6b5c] text-white rounded-full px-4 py-1" : "text-[#ff6b5c] rounded-full px-4 py-1"}
          onClick={() => setServeType("delivery")}
        >
          Giao hàng
        </Button>
      </div>

      {/* Danh sách món trong đơn hàng, mỗi món là một card nhỏ */}
      <div className="flex flex-col gap-3 mb-4">
        {cart.length === 0 && (
          <div className="text-center text-gray-400 py-6 bg-[#2a2a3c] rounded-lg">
            Chưa có món nào trong đơn hàng.
          </div>
        )}
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-[#2a2a3c] rounded-lg p-3 shadow"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
              <Image
                src={`http://localhost:30${item.image.startsWith('/') ? item.image : `/uploads/${item.image}`}`}
                alt={item.name}
                width={56}
                height={56}
                className="object-cover w-14 h-14"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-base truncate max-w-[120px]">{item.name}</span>
                <span className="font-semibold text-[#ff6b5c] text-base">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                </span>
              </div>
              <span className="text-xs text-gray-400">{item.price.toLocaleString("vi-VN")}₫</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">SL:</span>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => onUpdateCart(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 bg-[#232336] text-white border border-gray-600 rounded text-center text-sm"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:bg-transparent ml-2"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
              <input
                type="text"
                placeholder="Ghi chú"
                value={notes[item.id] || ""}
                onChange={(e) => handleNoteChange(item.id, e.target.value)}
                className="w-full bg-[#232336] text-white border border-gray-600 rounded px-2 py-1 text-xs mt-1"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tổng tiền */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between text-gray-400 text-sm">
          <span>Giảm giá:</span>
          <span>0₫</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Tổng tiền:</span>
          <span>{calculateTotal().toLocaleString("vi-VN")}₫</span>
        </div>
      </div>
      <Button
        className="w-full bg-[#ff6b5c] text-white py-3 rounded-lg text-base font-semibold"
        onClick={handleCheckoutClick}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Tiếp tục thanh toán"}
      </Button>
    </div>
  );
}

