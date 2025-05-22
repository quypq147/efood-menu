'use client';

import { useState } from 'react';
import FoodListPage from '@/components/FoodListPage';
import OrderPage from '@/components/OrderPage';
import PaymentPage from '@/components/PaymentPage';
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'sonner';

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  const handleAddToCart = (food) => {
    const existingItem = cart.find((item) => item.id === food.id);
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
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handleBackToOrder = () => {
    setShowPayment(false);
  };

  const handleConfirmPayment = () => {
    setCart([]);
    setShowPayment(false);
    toast.success("Thanh toán thành công!");
    // Có thể chuyển hướng sang trang cảm ơn hoặc in hóa đơn ở đây
  };

  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex h-screen">
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
                user={undefined}
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
