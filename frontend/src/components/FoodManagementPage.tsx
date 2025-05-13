"use client";

import { useState, useEffect } from "react";
import FoodCard from "@/components/food-card";
import AddFoodPage from "@/components/AddFoodPage";
import FoodEditPage from "@/components/FoodEditPage"; // Import trang chỉnh sửa món ăn
import CategoryManagement from "@/components/categoryManagerment"; // Import trang quản lý loại món
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getFoods, addFood, updateFood } from "@/api/food";
import { getCategories } from "@/api/category";

export default function FoodManagementPage() {
  const [food, setFood] = useState([]); // Danh sách món ăn
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const [activeCategory, setActiveCategory] = useState(null); // Danh mục đang được chọn
  const [editingFood, setEditingFood] = useState(null); // Món ăn đang chỉnh sửa
  const [originalFood, setOriginalFood] = useState([]); // Lưu trạng thái ban đầu để hủy thay đổi
  const [showCategoryManagement, setShowCategoryManagement] = useState(false); // Hiển thị trang quản lý loại món

  // Lấy danh sách món ăn và danh mục từ backend khi trang được tải
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foods, categories] = await Promise.all([
          getFoods(),
          getCategories(),
        ]);
        setFood(foods);
        setCategories([{ id: null, name: "Tất cả" }, ...categories]); // Thêm tab "Tất cả"
        setOriginalFood(foods); // Lưu trạng thái ban đầu
        setActiveCategory(null); // Mặc định chọn "Tất cả"
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  // Thêm món ăn mới
  const handleAddFood = async (newFood) => {
    if (!newFood.categoryId) {
      alert("Vui lòng chọn danh mục trước khi thêm món ăn.");
      return;
    }

    try {
      const addedFood = await addFood(newFood);
      setFood((prevFoods) => [...prevFoods, addedFood]);
    } catch (error) {
      console.error("Lỗi khi thêm món ăn:", error);
    }
  };

  // Cập nhật món ăn
  const handleSaveEdit = async (updatedFood) => {
    try {
      const savedFood = await updateFood(updatedFood.id, updatedFood);
      setFood((prevFoods) =>
        prevFoods.map((food) => (food.id === updatedFood.id ? savedFood : food))
      );
      setEditingFood(null); // Đóng modal chỉnh sửa
    } catch (error) {
      console.error("Lỗi khi cập nhật món ăn:", error);
    }
  };

  // Hủy thay đổi
  const handleDiscardChanges = () => {
    setFood([...originalFood]); // Khôi phục trạng thái ban đầu
  };

  // Lưu thay đổi
  const handleSaveChanges = () => {
    setOriginalFood([...food]); // Lưu trạng thái hiện tại
    alert("Đã lưu thay đổi!");
  };

  // Lọc món ăn theo danh mục
  const filteredFood = activeCategory
    ? food.filter((item) => item.categoryId === activeCategory)
    : food; // Hiển thị tất cả món nếu activeCategory là null

  // Hiển thị trang quản lý loại món nếu `showCategoryManagement` là true
  if (showCategoryManagement) {
    return (
      <CategoryManagement
        onClose={() => setShowCategoryManagement(false)} // Đóng trang quản lý loại món
      />
    );
  }

  return (
    <div className="p-6 bg-[#252836] text-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý món ăn</h1>
        <Button
          className="bg-[#ff6b5c] text-white px-4 py-2 rounded-lg"
          onClick={() => setShowCategoryManagement(true)} // Hiển thị trang quản lý loại món
        >
          Quản lý loại món ăn
        </Button>
      </div>

      {/* Tabs danh mục */}
      <div className="flex space-x-4 border-b border-gray-700 mb-6">
        {categories.map((category) => (
          <button
            key={category.id || "all"}
            onClick={() => setActiveCategory(category.id)}
            className={`pb-2 ${
              activeCategory === category.id
                ? "text-white border-b-2 border-[#ff6b5c]"
                : "text-gray-400"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Grid hiển thị món ăn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredFood.map((food) => (
          <FoodCard
            key={food.id}
            image={food.image}
            name={food.name}
            price={food.price}
            quantity={food.quantity}
            onEdit={() => setEditingFood(food)} // Mở modal chỉnh sửa
          />
        ))}

        {/* Nút thêm món ăn */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="border-dashed border-2 border-gray-400 rounded-lg flex items-center justify-center text-gray-400 cursor-pointer hover:bg-[#333347] h-84">
              + Thêm món ăn
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingFood ? "Sửa món ăn" : "Thêm món ăn"}
              </DialogTitle>
            </DialogHeader>
            {editingFood ? (
              <FoodEditPage
                food={editingFood}
                onSave={handleSaveEdit}
                onCancel={() => setEditingFood(null)}
              />
            ) : (
              <AddFoodPage
                onSave={handleAddFood}
                onCancel={() => setEditingFood(null)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Nút lưu và hủy */}
      <div className="flex justify-end space-x-4 mt-6">
        <Button
          variant="outline"
          className="border-gray-400 text-gray-400"
          onClick={handleDiscardChanges}
        >
          Hủy thay đổi
        </Button>
        <Button className="bg-[#ff6b5c] text-white" onClick={handleSaveChanges}>
          Lưu
        </Button>
      </div>
    </div>
  );
}
