"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { icons } from "@/lib/icons";
import Image from "next/image";
import { registerUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignUpForm() {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Mật khẩu không khớp");
      return;
    }

    if (!form.agree) {
      toast.error("Bạn cần đồng ý với điều khoản sử dụng");
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        fullname: form.fullname,
        email: form.email,
        password: form.password,
        username: form.username,
      });
      toast.success("Đăng ký thành công. Vui lòng kiểm tra email để xác minh.");
      router.push("/auth/sign-in");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1c1c28] px-4">
      <Link href="/" className="flex items-center mb-6">
        <Image src={icons.logo} alt="Logo" width={40} height={40} className="mr-2" />
        <span className="text-xl font-bold text-white">Efood</span>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="bg-[#2a2a3c] p-8 rounded-2xl w-full max-w-md shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">Đăng Ký</h2>

        <div>
          <Label className="text-white">Họ và tên</Label>
          <Input
            placeholder="Họ và tên"
            value={form.fullname}
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            className="mt-1 bg-gray-100"
            required
          />
        </div>

        <div>
          <Label className="text-white">Tên tài khoản (username)</Label>
          <Input
            placeholder="Tên tài khoản"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="mt-1 bg-gray-100"
            required
          />
        </div>

        <div>
          <Label className="text-white">Email</Label>
          <Input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 bg-gray-100"
            required
          />
        </div>

        <div>
          <Label className="text-white">Mật khẩu</Label>
          <Input
            placeholder="Mật khẩu"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 bg-gray-100"
            required
          />
        </div>

        <div>
          <Label className="text-white">Nhập lại mật khẩu</Label>
          <Input
            placeholder="Xác nhận mật khẩu"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className="mt-1 bg-gray-100"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="agree"
            checked={form.agree}
            onChange={(e) => setForm({ ...form, agree: e.target.checked })}
            className="w-4 h-4"
          />
          <Label htmlFor="agree" className="text-white text-sm">
            Tôi đồng ý với{" "}
            <span className="text-blue-400 hover:underline cursor-pointer">
              Điều khoản sử dụng
            </span>
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#ff6b5c] hover:bg-[#ff8575] text-white"
          disabled={loading}
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </Button>

        <p className="text-center text-sm text-white mt-2">
          Đã có tài khoản?{" "}
          <Link href="/auth/sign-in" className="text-blue-400 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </form>
    </div>
  );
}

