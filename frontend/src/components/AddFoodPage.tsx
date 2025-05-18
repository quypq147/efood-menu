'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { getCategories } from '@/api/category';
import { uploadImage } from '@/api/upload';

export default function AddFoodPage({ onSave, onCancel, initialData = null }) {
  const [name, setName] = useState(initialData?.name || '');
  const [price, setPrice] = useState(initialData?.price || '');
  const [quantity, setQuantity] = useState(initialData?.quantity || '');
  const [image, setImage] = useState(
    initialData?.image ? { preview: initialData.image } : null
  );
  const [description, setDescription] = useState(initialData?.description || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
  const [categories, setCategories] = useState([]);

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

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(Object.assign(file, { preview: URL.createObjectURL(file) }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });

  const handleSave = async () => {
    if (!name || !price || !quantity || !image || !categoryId) {
      alert('Vui lòng điền đầy đủ thông tin và chọn danh mục.');
      return;
    }

    let imageUrl = image.preview || image;
    // Nếu là file mới, upload ảnh trước khi lưu
    if (image && image.preview && image instanceof File) {
      try {
        imageUrl = await uploadImage(image, name);
      } catch (error) {
        alert('Lỗi khi tải lên hình ảnh.');
        return;
      }
    }

    const newFood = {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      image: imageUrl,
      description,
      categoryId: parseInt(categoryId, 10),
    };

    onSave(newFood); // chỉ trả dữ liệu về, không gọi API ở đây!
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
          placeholder="Nhập số lượng tô"
        />
      </div>
      <div>
        <Label htmlFor="category">Danh mục</Label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-2 rounded-lg text-black "
        >
          <option className="text-black" value="" disabled>
            Chọn danh mục
          </option>
          {categories.map((category) => (
            <option className="text-black" key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
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
