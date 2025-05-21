import { useEffect, useState } from "react";

export default function AppearanceSetting() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Lấy theme từ localStorage nếu có
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
    document.documentElement.className = saved || "dark";
  }, []);

  const handleChange = (value: string) => {
    setTheme(value);
    localStorage.setItem("theme", value);
    document.documentElement.className = value;
  };

  return (
    <div className="max-w-md mx-auto bg-[#232336] rounded-xl p-8 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Chỉnh giao diện</h2>
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            theme === "dark"
              ? "bg-[#ff6b5c] text-white"
              : "bg-[#181824] text-gray-300"
          }`}
          onClick={() => handleChange("dark")}
        >
          Dark Mode
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            theme === "light"
              ? "bg-[#ff6b5c] text-white"
              : "bg-[#181824] text-gray-300"
          }`}
          onClick={() => handleChange("light")}
        >
          Light Mode
        </button>
      </div>
      <p className="mt-4 text-gray-400">
        Chọn chế độ giao diện phù hợp với bạn. Giao diện sẽ được lưu cho lần truy cập sau.
      </p>
    </div>
  );
}