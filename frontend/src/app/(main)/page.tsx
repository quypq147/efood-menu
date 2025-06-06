"use client";

import { useState } from "react";
import FoodListPage from "@/components/FoodListPage";
import { useRouter } from "next/navigation";
import OrderPage from "@/components/OrderPage";
import PaymentPage from "@/components/PaymentPage";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";
import { useUserStore } from "@/store/userStore";

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const router = useRouter();
  const [serveType, setServeType] = useState("dine-in");
  const user = useUserStore((state) => state.user);

  const handleAddToCart = (food) => {
    if (!food.id) {
      toast.error("Món ăn không hợp lệ!");
      return;
    }
    // Kiểm tra số lượng còn lại (food.quantity là số lượng còn lại trong kho)
    const existingItem = cart.find((item) => item.id === food.id);
    const maxQuantity = food.quantity ?? 0;
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    if (maxQuantity === 0 || currentQuantity + 1 > maxQuantity) {
      toast.error(`Món "${food.name}" không đủ số lượng`);
      return;
    }
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  };

  const handleUpdateCart = (id, quantity) => {
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Giỏ hàng trống!");
      return;
    }
    setShowPayment(true);
  };

  const handleBackToOrder = () => {
    setShowPayment(false);
  };

  const handleConfirmPayment = async () => {
    if (cart.length === 0) {
      toast.error("Không có món nào để thanh toán!");
      return;
    }
    if (cart.some((item) => !item.id)) {
      toast.error("Có món ăn không hợp lệ trong giỏ hàng!");
      return;
    }
    try {
      const items = cart.map((item) => ({
        foodId: item.id,
        quantity: item.quantity,
        price: item.price,
        note: "", // hoặc notes[item.id] nếu có
      }));
      // Gửi đơn hàng lên backend
      const res = await axiosInstance.post("/orders", {
        serveType,
        total,
        items,
        // Thêm các thông tin khác nếu cần: serveType, notes, userId...
      });
      // Lấy orderId thực tế từ backend
      console.log("Đơn hàng đã tạo:", res.data);
      setCart([]);
      toast.success("Thanh toán thành công!");
      router.push(`/payment-success?orderId=${res.data.id}`);
    } catch (err) {
      toast.error("Tạo đơn hàng thất bại!");
    }
  };

  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Nội dung chính */}
      <div className="flex-1 flex">
        <div className="flex-1 p-10 overflow-y-auto scrollbar-hide">
          <FoodListPage onAddToCart={handleAddToCart} />
        </div>
        <AnimatePresence mode="wait">
          {!showPayment ? (
            <motion.div
              key="order"
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              className="w-[400px] bg-[#232336] h-screen overflow-y-auto scrollbar-hide"
            >
              <OrderPage
                cart={cart}
                onUpdateCart={handleUpdateCart}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
                user={user}
                serveType={serveType}
                setServeType={setServeType}
              />
            </motion.div>
          ) : (
            <PaymentPage
              key="payment"
              cart={cart}
              total={total}
              onBack={handleBackToOrder}
              onConfirm={handleConfirmPayment}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
