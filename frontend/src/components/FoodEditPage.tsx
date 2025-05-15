'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';

export default function FoodEditPage({ food, onSave, onCancel }) {
  const [name, setName] = useState(food?.name || '');
  const [price, setPrice] = useState(food?.price || '');
  const [quantity, setQuantity] = useState(food?.quantity || '');
  const [image, setImage] = useState(
    food?.image ? { preview: food.image } : null
  );
  const [description, setDescription] = useState(food?.description || '');
  const [categoryId, setCategoryId] = useState(food?.categoryId || '');

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(Object.assign(file, { preview: URL.createObjectURL(file) }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });

  const handleSave = () => {
    if (!name || !price || !quantity || !categoryId) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    const updatedFood = {
      id: food.id,
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      image: image.preview || image,
      description,
      categoryId,
    };

    onSave(updatedFood);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Tên món ăn</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên món ăn"
        />
      </div>
      <div>
        <Label htmlFor="price">Giá</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Nhập giá"
        />
      </div>
      <div>
        <Label htmlFor="quantity">Số lượng</Label>
        <Input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Nhập số lượng"
        />
      </div>
      <div>
        <Label htmlFor="category">Danh mục</Label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-2 rounded-lg text-black"
        >
          <option value="" disabled>
            Chọn danh mục
          </option>
          {/* Render danh mục từ props */}
        </select>
      </div>
      <div>
        <Label>Ảnh món ăn</Label>
        <div
          {...getRootProps()}
          className="border-dashed border-2 border-gray-400 rounded-lg p-4 mt-2 cursor-pointer hover:bg-[#333347]"
        >
          <input {...getInputProps()} />
          {image ? (
            <img
              src={image.preview}
              alt="Preview"
              className="w-full h-32 object-cover rounded-lg"
            />
          ) : (
            <p className="text-gray-400">Kéo thả hoặc nhấn để tải ảnh lên</p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="description">Mô tả</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Nhập mô tả món ăn"
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button onClick={handleSave}>Lưu</Button>
      </div>
    </div>
  );
}