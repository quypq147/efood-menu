import { useEffect, useState } from 'react';
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '@/api/category';
import Link from 'next/link';

const CategoryManagement = ({ onBack, onGoToFood }) => {
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const [newCategory, setNewCategory] = useState(''); // Tên danh mục mới
  const [editingCategory, setEditingCategory] = useState(null); // Danh mục đang chỉnh sửa
  const [editingName, setEditingName] = useState(''); // Tên danh mục đang chỉnh sửa

  // Lấy danh sách danh mục khi trang được tải
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
      }
    };
    fetchCategories();
  }, []);

  // Thêm danh mục mới
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert('Tên danh mục không được để trống.');
      return;
    }
    try {
      const addedCategory = await addCategory({ name: newCategory });
      setCategories((prev) => [...prev, addedCategory]);
      setNewCategory('');
    } catch (error) {
      console.error('Lỗi khi thêm danh mục:', error);
    }
  };

  // Bắt đầu chỉnh sửa danh mục
  const handleEditCategory = (id) => {
    const category = categories.find((cat) => cat.id === id);
    setEditingCategory(category);
    setEditingName(category.name);
  };

  // Lưu chỉnh sửa danh mục
  const handleSaveEdit = async () => {
    if (!editingName.trim()) {
      alert('Tên danh mục không được để trống.');
      return;
    }
    try {
      const updatedCategory = await updateCategory(editingCategory.id, {
        name: editingName,
      });
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id ? updatedCategory : cat
        )
      );
      setEditingCategory(null);
      setEditingName('');
    } catch (error) {
      console.error('Lỗi khi cập nhật danh mục:', error);
    }
  };

  // Xóa danh mục
  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error('Lỗi khi xóa danh mục:', error);
    }
  };

  return (
    <div className="p-6  text-white rounded-lg  max-w-2xl overflow-hidden">
      <div className='flex justify-between items-center mb-4'>
        <h1 className="text-2xl font-bold mb-6">Quản lý danh mục</h1>
      <Link href="/settings">
        <button className="px-4 py-2 bg-[#ff6b5c] cursor-pointer text-white rounded-lg mb-4"
        onClick={onGoToFood}>
          Quay lại trang quản lý món ăn
        </button>
      </Link> 
      </div>


      {/* Thêm danh mục */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Thêm danh mục mới</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nhập tên danh mục"
            className="w-full p-2 rounded-lg bg-[#333347] text-white"
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-[#ff6b5c] text-white rounded-lg"
          >
            Thêm
          </button>
        </div>
      </div>

      {/* Danh sách danh mục */}
      <div>
        <h2 className="text-lg font-bold mb-2">Danh sách danh mục</h2>
        <table className="w-full text-left text-sm bg-[#2a2a3c] rounded-lg">
          <thead>
            <tr className="text-gray-400">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Tên</th>
              <th className="py-2 px-4">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t border-gray-700">
                <td className="py-2 px-4">{category.id}</td>
                <td className="py-2 px-4">
                  {editingCategory?.id === category.id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="w-full p-2 rounded-lg bg-[#333347] text-white"
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td className="py-2 px-4 space-x-2">
                  {editingCategory?.id === category.id ? (
                    <button
                      onClick={handleSaveEdit}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                      Lưu
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditCategory(category.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Sửa
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManagement;
