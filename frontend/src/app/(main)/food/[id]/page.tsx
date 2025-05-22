'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FoodDetailPage() {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch(`/api/food/${id}`)
      .then(res => res.json())
      .then(data => {
        setFood(data.food);
        setComments(data.comments || []);
        setLikes(data.likes || 0);
        setLiked(data.liked || false);
      });
  }, [id]);

  const handleLike = async () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleAddComment = async () => {
    if (!commentInput.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        user: { name: "Bạn" },
        content: commentInput,
        createdAt: new Date().toISOString(),
      },
    ]);
    setCommentInput("");
    toast.success("Đã gửi bình luận!");
  };

  if (!food) return <div className="p-10 text-center">Đang tải...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto p-6 bg-[#232336] rounded-xl text-white mt-8"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-shrink-0"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${food.image.startsWith('/') ? food.image : `/uploads/${food.image}`}`}
            alt={food.name}
            width={240}
            height={180}
            className="rounded-lg object-cover"
          />
        </motion.div>
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{food.name}</h1>
          <div className="text-[#ff6b5c] text-xl font-semibold">
            {food.price.toLocaleString("vi-VN")}₫
          </div>
          <div className="text-gray-400">{food.description}</div>
          <div className="flex items-center gap-4 mt-2">
            <Button
              variant={liked ? "secondary" : "outline"}
              className={liked ? "bg-[#ff6b5c] text-white" : "text-[#ff6b5c]"}
              onClick={handleLike}
            >
              <Heart fill={liked ? "#ff6b5c" : "none"} className="mr-2" />
              {likes} Thích
            </Button>
            <span>Còn lại: {food.quantity}</span>
          </div>
        </div>
      </div>

      {/* Bình luận */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Bình luận</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={commentInput}
            onChange={e => setCommentInput(e.target.value)}
            placeholder="Viết bình luận..."
            className="flex-1 px-3 py-2 rounded bg-[#181824] text-white border border-gray-600"
          />
          <Button onClick={handleAddComment}>Gửi</Button>
        </div>
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {comments.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-400"
              >
                Chưa có bình luận nào.
              </motion.div>
            )}
            {comments.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="bg-[#181824] rounded-lg p-3"
              >
                <div className="font-semibold">{c.user?.name || "Ẩn danh"}</div>
                <div className="text-sm text-gray-300">{c.content}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(c.createdAt).toLocaleString("vi-VN")}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}