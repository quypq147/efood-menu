'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AddFoodPage({ onSave, onCancel }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    const newFood = { name, price, quantity, image, description };
    onSave(newFood);
  };

  return (
    <div className="p-6 bg-[#252836] text-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Dish</h2>

      {/* Name */}
      <div className="mb-4">
        <Label htmlFor="name">Dish Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter dish name"
          className="mt-2"
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <Label htmlFor="price">Price ($)</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          className="mt-2"
        />
      </div>

      {/* Quantity */}
      <div className="mb-4">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          className="mt-2"
        />
      </div>

      {/* Image */}
      <div className="mb-4">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Enter image URL"
          className="mt-2"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter dish description"
          className="mt-2"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel} className="border-gray-400 text-gray-400">
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-[#ff6b5c] hover:bg-[#ff8575]">
          Add Dish
        </Button>
      </div>
    </div>
  );
}