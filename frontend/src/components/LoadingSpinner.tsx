import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ text = "Đang tải..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Loader2 className="animate-spin text-[#ff6b5c]" size={40} />
      <span className="mt-4 text-white text-lg">{text}</span>
    </div>
  );
}