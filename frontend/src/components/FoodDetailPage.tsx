'use client';

import { useState } from 'react';

export default function FoodDetailPage({ food }) {
  const [comments, setComments] = useState([
    { id: 1, user: 'Nguyễn Văn A', content: 'Món ăn rất ngon!', rating: 5 },
    { id: 2, user: 'Trần Thị B', content: 'Hương vị ổn, nhưng hơi cay.', rating: 4 },
  ]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const averageRating = (
    comments.reduce((total, comment) => total + comment.rating, 0) / comments.length
  ).toFixed(1);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: Date.now(), user: 'Khách hàng', content: newComment, rating: newRating },
      ]);
      setNewComment('');
      setNewRating(5);
    }
  };

  return (
    <div className="p-6 bg-[#252836] text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{food.name}</h1>
      <p className="text-gray-400 mb-6">{food.description}</p>
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      {/* Đánh giá trung bình */}
      <div className="mb-6">
        <h2 className="text-xl font-bold">Đánh giá</h2>
        <p className="text-lg text-yellow-400">{averageRating} / 5</p>
        <p className="text-sm text-gray-400">{comments.length} đánh giá</p>
      </div>

      {/* Bình luận */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Bình luận</h2>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-[#2a2a3c] p-4 rounded-lg">
              <p className="text-sm text-gray-400">{comment.user}</p>
              <p className="text-white">{comment.content}</p>
              <p className="text-yellow-400">Rating: {comment.rating} / 5</p>
            </div>
          ))}
        </div>
      </div>

      {/* Thêm bình luận */}
      <div className="bg-[#2a2a3c] p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Thêm bình luận</h3>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Viết bình luận..."
          className="w-full p-2 rounded-lg bg-[#333347] text-white mb-2"
        />
        <div className="flex items-center justify-between">
          <select
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
            className="bg-[#333347] text-white p-2 rounded-lg"
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} sao
              </option>
            ))}
          </select>
          <button
            onClick={handleAddComment}
            className="bg-[#ff6b5c] px-4 py-2 rounded-lg text-white"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}