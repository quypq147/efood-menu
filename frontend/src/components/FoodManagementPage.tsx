'use client';

import { useState } from 'react';
import FoodCard from '@/components/food-card';
import FoodEditPage from '@/components/FoodEditPage';
import AddFoodPage from '@/components/AddFoodPage';

export default function FoodManagementPage() {
  const [food, setFood] = useState([
    {
      id: 1,
      name: 'Mì hải sản cay',
      price: 2.29,
      quantity: 20,
      image: '/path/to/image1.jpg',
      description: 'Một món mì hải sản thơm ngon với vị cay đặc trưng.',
    },
    {
      id: 2,
      name: 'Mì Ý sốt nấm',
      price: 2.69,
      quantity: 30,
      image: '/path/to/image2.jpg',
      description: 'Mì Ý kem với sốt nấm đậm đà.',
    },
  ]);
  const [editingFood, setEditingFood] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSaveEdit = (updatedFood) => {
    setFood((prevFoods) =>
      prevFoods.map((food) => (food.id === editingFood.id ? updatedFood : food))
    );
    setEditingFood(null);
  };

  const handleAddFood = (newFood) => {
    setFood((prevFoods) => [...prevFoods, { ...newFood, id: Date.now() }]);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setEditingFood(null);
    setIsAdding(false);
  };

  return (
    <div>
      

      {isAdding ? (
        <AddFoodPage onSave={handleAddFood} onCancel={handleCancel} />
      ) : editingFood ? (
        <FoodEditPage food={editingFood} onSave={handleSaveEdit} onCancel={handleCancel} />
      ) : (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              onClick={() => setIsAdding(true)}
              className="border-dashed border-2 border-gray-400 rounded-lg flex items-center justify-center text-gray-400 cursor-pointer hover:bg-[#333347]"
            >
              + Thêm món ăn
            </div>
            {food.map((food) => (
              <FoodCard
                key={food.id}
                image={food.image}
                name={food.name}
                price={food.price}
                quantity={food.quantity}
                onEdit={() => setEditingFood(food)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}