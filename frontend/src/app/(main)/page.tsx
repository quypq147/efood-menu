'use client';

import { useState } from 'react';
import FoodListPage from '@/components/FoodListPage';
import OrderPage from '@/components/OrderPage';

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [isOrdering, setIsOrdering] = useState(false);

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
    setIsOrdering(true); // Chuyển sang trang đặt hàng
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
    setIsOrdering(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      {isOrdering ? (
        <OrderPage
          cart={cart}
          onUpdateCart={handleUpdateCart}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      ) : (
        <FoodListPage onAddToCart={handleAddToCart} />
      )}
    </main>
  );
}
