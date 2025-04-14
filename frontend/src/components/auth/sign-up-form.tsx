"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { icons } from "@/lib/icons";
import Image from "next/image";
import { registerUser, loginUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";

export default function SignUpForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp");
      return;
    }
    if (!form.agree) {
      toast.error("Bạn phải đồng ý với điều khoản sử dụng");
      return;
    }
    setLoading(true);
    try {
      await registerUser({ name: form.name, email: form.email, password: form.password });
      toast.success("Đăng ký thành công! Hãy kiểm tra email để xác nhận.");
      // Optional: auto login nếu email không cần xác nhận
      // const loginRes = await loginUser({ email: form.email, password: form.password });
      // setUser(loginRes.user);
      // router.push("/");
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
        <h2 className="text-2xl font-bold text-center text-white mb-6">Đăng Ký</h2>

        <div className="space-y-4">
          <div>
            <Label className="text-white">Họ và tên</Label>
            <Input
              placeholder="Họ và tên"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 bg-gray-100"
              required
            />
          </div>

          <div>
            <Label className="text-white">Email</Label>
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

          <div>
            <Label className="text-white">Nhập lại mật khẩu</Label>
            <Input
              placeholder="Nhập lại mật khẩu"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className="mt-1 bg-gray-100"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="agree"
              checked={form.agree}
              onCheckedChange={(checked) => setForm({ ...form, agree: !!checked })}
            />
            <Label htmlFor="agree" className="text-white text-sm">
              Tôi đồng ý với <span className="underline">Điều khoản sử dụng</span>
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#ff6b5c] hover:bg-[#ff8575] text-white"
            disabled={loading}
          >
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </Button>

          <p className="text-center text-sm text-white mt-4">
            Đã có tài khoản?{' '}
            <Link
              href="/auth/sign-in"
              className="text-blue-400 hover:underline"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

