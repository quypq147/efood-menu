"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { icons } from "@/lib/icons";
import Image from "next/image";
import { loginUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";

export default function SignInForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginRes = await loginUser(form);
      setUser(loginRes.user);
      toast.success("Đăng nhập thành công!");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1c1c28] px-4">
      <Link href="/" className="flex items-center mb-6">
        <Image
          src={icons.logo}
          alt="Logo"
          width={40}
          height={40}
          className="mr-2"
        />
        <span className="text-xl font-bold text-white">Efood</span>
      </Link>
      <form onSubmit={handleSubmit} className="bg-[#2a2a3c] p-8 rounded-2xl w-full max-w-md shadow-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Đăng Nhập
        </h2>

        <div className="space-y-4">
          <div>
            <Label className="text-white">Tên tài khoản</Label>
            <Input
              placeholder="Nhập email"
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={() => setRememberMe(!rememberMe)}
            />
            <Label htmlFor="remember" className="text-white text-sm">
              Ghi nhớ cho lần sau đăng nhập
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#ff6b5c] hover:bg-[#ff8575] text-white"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
          <p className="text-right text-sm mt-1">
  <Link href="/auth/forgot-password" className="text-blue-400 hover:underline">
    Quên mật khẩu?
  </Link>
</p>

          <Button type="button" variant="outline" className="w-full bg-white text-black">
            Đăng nhập qua Gmail
          </Button>

          <p className="text-center text-sm text-white mt-4">
            Nếu bạn chưa có tài khoản{' '}
            <Link
              href="/auth/sign-up"
              className="text-blue-400 hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

