'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function PaymentPage({ cart, total, onBack, onConfirm }) {
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="w-[400px] bg-[#232336] h-screen overflow-y-auto scrollbar-hide p-6 rounded-2xl"
    >
      <h2 className="text-xl font-bold mb-4">Thanh toán</h2>
      <div className="mb-4">
        <div className="font-semibold mb-2">Danh sách món:</div>
        <div className="flex flex-col gap-2">
          <AnimatePresence>
            {cart.map(item => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 bg-[#2a2a3c] rounded-lg p-2"
              >
                <div className="w-10 h-10 rounded overflow-hidden bg-gray-700 flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${item.image.startsWith('/') ? item.image : `/uploads/${item.image}`}`}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="object-cover w-10 h-10"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-400">
                    SL: {item.quantity} x {item.price.toLocaleString("vi-VN")}₫
                  </div>
                </div>
                <div className="font-semibold text-[#ff6b5c]">
                  {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-gray-400 text-sm">
          <span>Giảm giá:</span>
          <span>0₫</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Tổng tiền:</span>
          <span>{total.toLocaleString("vi-VN")}₫</span>
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-3">
        <Button className="bg-[#ff6b5c] text-white w-full">Thanh toán thẻ</Button>
        <div className="flex gap-2 items-center">
          <Image src="/visa.png" alt="visa" width={48} height={32} />
          <Image src="/mastercard.png" alt="mastercard" width={48} height={32} />
        </div>
        <Button className="bg-[#ff6b5c] text-white w-full">Quét mã MOMO</Button>
        <div className="flex justify-center">
          <Image src="/momo-qr.png" alt="momo qr" width={120} height={120} />
        </div>
        <Button className="bg-[#ff6b5c] text-white w-full">Thanh toán tại quầy</Button>
      </div>
      <Button
        className="w-full bg-[#ff6b5c] text-white py-3 rounded-lg text-base font-semibold mt-2"
        onClick={onConfirm}
      >
        Xác nhận thanh toán
      </Button>
      <Button
        variant="outline"
        className="w-full mt-2"
        onClick={onBack}
      >
        Quay lại
      </Button>
    </motion.div>
  );
}