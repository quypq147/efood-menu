'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

export default function FoodEditPage({ food, onSave, onCancel, categories = [] }) {
  const [name, setName] = useState(food?.name || '');
  const [code, setCode] = useState(food?.code || '');
  const [price, setPrice] = useState(food?.price || '');
  const [quantity, setQuantity] = useState(food?.quantity || '');
  const [image, setImage] = useState(food?.image ? { preview: food.image } : null);
  const [description, setDescription] = useState(food?.description || '');
  const [categoryId, setCategoryId] = useState(food?.categoryId || '');
  const [sauce, setSauce] = useState(food?.sauce || '');
  const [vat, setVat] = useState(food?.vat || '');
  const [status, setStatus] = useState(food?.status ?? true);

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
      code,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      image: image.preview || image,
      description,
      categoryId,
      sauce,
      vat,
      status,
    };

    onSave(updatedFood);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#232336] rounded-xl p-8 shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-white">Thêm món ăn</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {/* Cột trái */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-300">Tên món:</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên món ăn"
              className="mt-1 bg-[#181824] text-white"
            />
          </div>
          <div>
            <Label htmlFor="category" className="text-gray-300">Danh mục:</Label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2 rounded-lg mt-1 bg-[#181824] text-white"
            >
              <option value="" disabled>Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="description" className="text-gray-300">Mô tả:</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả món ăn"
              className="mt-1 bg-[#181824] text-white"
            />
          </div>
          <div className="flex items-center mt-2">
            <input
              id="status"
              type="checkbox"
              checked={status}
              onChange={() => setStatus((v) => !v)}
              className="accent-[#ff6b5c] w-5 h-5"
            />
            <Label htmlFor="status" className="ml-2 text-gray-300">
              Có trong thực đơn trực tuyến
            </Label>
          </div>
        </div>
        {/* Cột phải */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="code" className="text-gray-300">Mã món:</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Nhập mã món"
              className="mt-1 bg-[#181824] text-white"
            />
          </div>
          <div>
            <Label htmlFor="price" className="text-gray-300">Giá tiền:</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Nhập giá"
              className="mt-1 bg-[#181824] text-white"
            />
          </div>
          <div>
            <Label htmlFor="quantity" className="text-gray-300">Số lượng:</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Nhập số lượng"
              className="mt-1 bg-[#181824] text-white"
            />
          </div>
          <div>
            <Label className="text-gray-300">Tải ảnh lên:</Label>
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-400 rounded-lg p-4 mt-2 cursor-pointer hover:bg-[#333347] flex flex-col items-center justify-center min-h-[120px]"
            >
              <input {...getInputProps()} />
              {image ? (
                <img
                  src={image.preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <UploadCloud size={32} className="text-gray-400 mb-2" />
                  <span className="text-3xl text-gray-400 font-bold">+</span>
                  <p className="text-gray-400 mt-1">Kéo thả hoặc nhấn để tải ảnh lên</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Nút hành động */}
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" onClick={onCancel} className="border-[#ff6b5c] text-[#ff6b5c] hover:bg-[#232336]">
          Hủy bỏ
        </Button>
        <Button onClick={handleSave} className="bg-[#ff6b5c] text-white px-8">
          Lưu
        </Button>
      </div>
    </div>
  );
}