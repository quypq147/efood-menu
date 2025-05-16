'use client';

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#232336] text-white">
      <div className="bg-[#2a2a3c] rounded-2xl p-8 shadow-lg flex flex-col items-center">
        <svg width="64" height="64" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#22c55e" />
          <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-2xl font-bold mt-4 mb-2">Thanh toán thành công!</h1>
        <p className="text-gray-300 mb-6 text-center">Cảm ơn bạn đã đặt hàng.<br />Đơn hàng của bạn đã được ghi nhận.</p>
        <a
          href="/"
          className="bg-[#ff6b5c] hover:bg-[#ff3b2e] text-white px-6 py-2 rounded-lg font-semibold transition"
        >
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
}