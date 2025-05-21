"use client";

import { useState, useEffect } from "react";
import FoodCard from "@/components/food-card";
import { getFoods } from "@/api/food";
import { getCategories } from "@/api/category";
import { useUserStore } from "@/store/userStore";
import { motion, AnimatePresence } from "framer-motion";

export default function FoodListPage({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [now, setNow] = useState("");
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foodData, categoryData] = await Promise.all([
          getFoods(),
          getCategories(),
        ]);
        setFoods(foodData);
        setCategories([{ id: null, name: "Tất cả" }, ...categoryData]);
        setActiveCategory(null);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
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
        minute: "2-digit",
      })
    );
  }, []);
  useEffect(() => {
    if (activeCategory) {
      setFilteredFoods(
        foods.filter((food) => food.categoryId === activeCategory)
      );
    } else {
      setFilteredFoods(foods);
    }
  }, [activeCategory, foods]);

  return (
    <div className="text-white min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Xin chào{user?.fullname ? `, ${user.fullname}` : " Khách hàng"}!
        </h1>
        <p>{now}</p>
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
        <AnimatePresence>
          {filteredFoods.map((food) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.2 }}
              onClick={() => onAddToCart(food)}
              className="cursor-pointer"
            >
              <FoodCard
                image={food.image}
                name={food.name}
                price={food.price}
                quantity={food.quantity}
                onEdit={undefined}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {filteredFoods.length === 0 && (
          <div className="col-span-2 text-center text-gray-400">
            Không có món ăn nào trong danh mục này.
          </div>
        )}
      </div>
    </div>
  );
}
