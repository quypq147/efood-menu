'use client';

import { useState } from 'react';
import FoodListPage from '@/components/FoodListPage';
import OrderPage from '@/components/OrderPage';

export default function HomePage() {
  const [cart, setCart] = useState([]);

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
    alert('Proceeding to payment...');
    setCart([]);
  };

  return (
    <div className="flex h-screen">
      {/* Nội dung chính */}
      <div className="flex-1 flex">
        <div className="flex-1 p-10 overflow-y-auto scrollbar-hide">
          <FoodListPage onAddToCart={handleAddToCart} />
        </div>
        <div className="w-[400px] bg-[#232336] h-screen overflow-y-auto scrollbar-hide">
          <OrderPage
            cart={cart}
            onUpdateCart={handleUpdateCart}
            onRemoveItem={handleRemoveItem}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
