"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation"; // Thêm dòng này

export default function FoodCard({ image, name, price, quantity, onEdit, id }) {
  const { user } = useUserStore();
  const router = useRouter(); // Thêm dòng này

  const isEditable =
    user?.roleName === "Admin" || user?.roleName === "Nhân viên";

  return (
    <Card className="bg-[#2a2a3c] text-white hover:shadow-lg hover:bg-[#333347] transition-all  border-0">
      <CardHeader className="p-0">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${
            image.startsWith("/") ? image : `/uploads/${image}`
          }`}
          alt={name}
          className="w-full h-32 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-400 mt-1">
          {new Intl.NumberFormat("vi-VN").format(price)}₫ •{" "}
          {new Intl.NumberFormat("vi-VN").format(quantity)} bát
        </p>
      </CardContent>
      <CardFooter className="p-4 flex flex-col gap-2">
        {isEditable ? (
          <Button
            className="w-full cursor-pointer bg-[#ff6b5c] hover:bg-[#ff8575]"
            onClick={onEdit}
          >
            Chỉnh sửa món ăn
          </Button>
        ) : quantity === 0 ? (
          <p className="text-sm font-semibold text-red-500">Tạm hết</p>
        ) : (
          <p className="text-sm text-gray-400">
            Còn lại: {new Intl.NumberFormat("vi-VN").format(quantity)}
          </p>
        )}
        {/* Nút xem chi tiết */}
        <Button
          variant="outline"
          className="w-full mt-2 border-[#ff6b5c] text-[#ff6b5c] hover:bg-[#ff6b5c] hover:text-white"
          onClick={() => router.push(`/food/${id}`)}
        >
          Xem chi tiết
        </Button>
      </CardFooter>
    </Card>
  );
}
