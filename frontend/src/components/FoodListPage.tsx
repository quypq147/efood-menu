"use client";

import { useState, useEffect } from "react";
import FoodCard from "@/components/food-card";
import { getFoods } from "@/api/food"; // Import API lấy danh sách món ăn
import { getCategories } from "@/api/category"; // Import API lấy danh sách danh mục

export default function FoodListPage({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState(null); // Danh mục đang được chọn
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const [foods, setFoods] = useState([]); // Danh sách món ăn
  const [filteredFoods, setFilteredFoods] = useState([]); // Danh sách món ăn đã lọc

  // Lấy danh sách món ăn và danh mục từ backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodData, categoryData] = await Promise.all([
          getFoods(),
          getCategories(),
        ]);
        setFoods(foodData);
        setCategories([{ id: null, name: "Tất cả" }, ...categoryData]); // Thêm tab "Tất cả"
        setActiveCategory(null); // Mặc định chọn "Tất cả"
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  // Lọc món ăn theo danh mục
  useEffect(() => {
    if (activeCategory) {
      setFilteredFoods(
        foods.filter((food) => food.categoryId === activeCategory)
      );
    } else {
      setFilteredFoods(foods); // Hiển thị tất cả món ăn nếu activeCategory là null
    }
  }, [activeCategory, foods]);

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
      <div className="flex space-x-4 mb-6 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id || "all"}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg ${
              activeCategory === category.id
                ? "bg-[#ff6b5c] text-white"
                : "bg-[#2a2a3c] text-gray-400 hover:bg-[#333347]"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Danh sách món ăn */}
      <h2 className="text-xl font-bold mb-4">Chọn món</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredFoods.map((food) => (
          <div key={food.id} onContextMenu={(e) => handleRightClick(e, food)}>
            <FoodCard
              image={food.image}
              name={food.name}
              price={food.price}
              quantity={food.quantity}
            />
          </div>
        ))}
        {filteredFoods.length === 0 && (
          <div className="col-span-2 text-center text-gray-400">
            Không có món ăn nào trong danh mục này.
          </div>
        )}
      </div>
    </div>
  );
}
