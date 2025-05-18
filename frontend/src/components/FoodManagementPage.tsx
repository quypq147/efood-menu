"use client";

import { useState, useEffect } from "react";
import FoodCard from "@/components/food-card";
import AddFoodPage from "@/components/AddFoodPage";
import FoodEditPage from "@/components/FoodEditPage";
import CategoryManagement from "@/components/categoryManagerment";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getFoods, addFood, updateFood } from "@/api/food";
import { getCategories } from "@/api/category";

export default function FoodManagementPage() {
  const [food, setFood] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [editingFood, setEditingFood] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [originalFood, setOriginalFood] = useState([]);
  const [showCategoryManagement, setShowCategoryManagement] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [foods, categories] = await Promise.all([
          getFoods(),
          getCategories(),
        ]);
        setFood(foods);
        setCategories([{ id: null, name: "Tất cả" }, ...categories]);
        setOriginalFood(foods);
        setActiveCategory(null);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddFood = async (newFood) => {
    if (!newFood.categoryId) {
      alert("Vui lòng chọn danh mục trước khi thêm món ăn.");
      return;
    }
    try {
      const addedFood = await addFood(newFood); // chỉ gọi API ở đây
      setFood((prevFoods) => [...prevFoods, addedFood]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Lỗi khi thêm món ăn:", error);
    }
  };

  const handleSaveEdit = async (updatedFood) => {
    try {
      const savedFood = await updateFood(updatedFood.id, updatedFood);
      setFood((prevFoods) =>
        prevFoods.map((food) => (food.id === updatedFood.id ? savedFood : food))
      );
      setEditingFood(null);
      setShowEditModal(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật món ăn:", error);
    }
  };

  const handleDiscardChanges = () => {
    setFood([...originalFood]);
  };

  const handleSaveChanges = () => {
    setOriginalFood([...food]);
    alert("Đã lưu thay đổi!");
  };

  const filteredFood = activeCategory
    ? food.filter((item) => item.categoryId === activeCategory)
    : food;

  if (showCategoryManagement) {
    return (
      <CategoryManagement onGoToFood={() => setShowCategoryManagement(false)} />
    );
  }

  return (
    <div className="p-5 bg-[#252836] text-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý món ăn</h1>
        <Button
          className="bg-[#ff6b5c] text-white px-4 py-2 rounded-lg"
          onClick={() => setShowCategoryManagement(true)}
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
            onEdit={() => {
              setEditingFood(food);
              setShowEditModal(true);
            }}
          />
        ))}

        {/* Nút thêm món ăn */}
        <div
          className="border-dashed border-2 border-gray-400 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#333347] h-84 cursor-pointer"
          onClick={() => setShowAddModal(true)}
        >
          + Thêm món ăn
        </div>
      </div>

      {/* Modal Thêm món ăn */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm món ăn</DialogTitle>
          </DialogHeader>
          <AddFoodPage
            onSave={handleAddFood} // chỉ gọi API ở đây
            onCancel={() => setShowAddModal(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Modal Sửa món ăn */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="bg-[#252836] text-white">
          <DialogHeader>
            <DialogTitle>Sửa món ăn</DialogTitle>
          </DialogHeader>
          {editingFood && (
            <FoodEditPage
              food={editingFood}
              categories={categories}
              onSave={handleSaveEdit}
              onCancel={() => setShowEditModal(false)}
            />
          )}
        </DialogContent>
      </Dialog>

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
