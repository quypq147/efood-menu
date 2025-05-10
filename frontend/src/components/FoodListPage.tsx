'use client';

import { useState } from 'react';
import FoodCard from '@/components/food-card';

export default function FoodListPage({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('Hot Dishes');
  const categories = ['Hot Dishes', 'Cold Dishes', 'Soup', 'Grill', 'Appetizer', 'Dessert'];

  const foods = [
    { id: 1, name: 'Spicy seasoned seafood noodles', price: 2.29, quantity: 20, image: '/path/to/image1.jpg' },
    { id: 2, name: 'Salted Pasta with mushroom sauce', price: 2.99, quantity: 11, image: '/path/to/image2.jpg' },
    { id: 3, name: 'Beef dumpling in hot and sour soup', price: 2.89, quantity: 16, image: '/path/to/image3.jpg' },
    { id: 4, name: 'Healthy noodle with spinach leaf', price: 3.29, quantity: 22, image: '/path/to/image4.jpg' },
    { id: 5, name: 'Hot spicy fried rice with omelet', price: 3.49, quantity: 13, image: '/path/to/image5.jpg' },
    { id: 6, name: 'Spicy instant noodle with special omelet', price: 3.59, quantity: 17, image: '/path/to/image6.jpg' },
  ];

  const handleRightClick = (e, food) => {
    e.preventDefault(); // Ngăn menu chuột phải mặc định
    onAddToCart(food); // Gọi hàm thêm món vào giỏ hàng
  };

  return (
    <div className="text-white min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Jaegar Resto</h1>
        <p className="text-gray-400">Tuesday, 2 Feb 2021</p>
      </div>

      {/* Danh mục */}
      <div className="flex space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg ${
              activeCategory === category
                ? 'bg-[#ff6b5c] text-white'
                : 'bg-[#2a2a3c] text-gray-400 hover:bg-[#333347]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Danh sách món ăn */}
      <h2 className="text-xl font-bold mb-4">Choose Dishes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {foods.map((food) => (
          <div key={food.id} onContextMenu={(e) => handleRightClick(e, food)}>
            <FoodCard
              image={food.image}
              name={food.name}
              price={food.price}
              quantity={food.quantity}
            />
          </div>
        ))}
      </div>
    </div>
  );
}