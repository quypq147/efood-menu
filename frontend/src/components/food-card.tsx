'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useUserStore } from '@/store/userStore';

export default function FoodCard({ image, name, price, quantity , onEdit }) {
  const { user } = useUserStore(); // Lấy thông tin người dùng từ store
  
  const isEditable = user?.roleName === 'Admin' || user?.roleName === 'Nhân viên'; // Kiểm tra quyền

  

  return (
    <Card className="bg-[#2a2a3c] text-white hover:shadow-lg hover:bg-[#333347] transition-all  border-0">
      <CardHeader className="p-0">
        <img
          src={`http://localhost:30${image.startsWith('/') ? image : `/uploads/${image}`}`}
          alt={name}
          className="w-full h-32 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-400 mt-1">
          {new Intl.NumberFormat('vi-VN').format(price)}₫ • {new Intl.NumberFormat('vi-VN').format(quantity)} bát
        </p>
      </CardContent>
      <CardFooter className="p-4">
        {isEditable ? (
          <Button className="w-full cursor-pointer bg-[#ff6b5c] hover:bg-[#ff8575]"
          onClick={onEdit}>
            Chỉnh sửa món ăn
          </Button>
        ) : (
          <p className="text-sm text-gray-400">Còn lại: {new Intl.NumberFormat('vi-VN').format(quantity)} </p>
        )}
      </CardFooter>
    </Card>
  );
}