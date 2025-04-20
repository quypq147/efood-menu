"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { icons } from "@/lib/icons";
import Image from "next/image";
import { loginUser, resendVerifyEmail } from "@/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";
import { Loader2, MailWarning } from "lucide-react";

export default function SignInForm() {
  const [form, setForm] = useState({ emailOrUsername: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(form);
      setUser(res.user);
      toast.success("🎉 Đăng nhập thành công!");
      router.push("/");
    } catch (err: any) {
      const msg = err?.response?.data?.message;
      toast.error(msg || "Đăng nhập thất bại");
      if (msg?.includes("chưa xác minh")) setShowResend(true);
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    try {
      await resendVerifyEmail(form.emailOrUsername);
      toast.success("✅ Email xác minh đã được gửi!");
    } catch {
      toast.error("Không thể gửi lại email xác minh!");
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

      <form
        onSubmit={handleSubmit}
        className="bg-[#2a2a3c] p-8 rounded-2xl w-full max-w-md shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Đăng Nhập
        </h2>

        <div className="space-y-4">
          <div>
            <Label className="text-white">Email hoặc Tên tài khoản</Label>
            <Input
              placeholder="Nhập email hoặc username"
              value={form.emailOrUsername}
              onChange={(e) =>
                setForm({ ...form, emailOrUsername: e.target.value })
              }
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
          {showResend && (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500 rounded-md text-sm text-yellow-300 flex items-center gap-2">
              <MailWarning size={18} />
              <span>Email chưa được xác minh.</span>
              <Button
                type="button"
                onClick={handleResend}
                size="sm"
                variant="secondary"
                className="ml-auto text-yellow-100 bg-yellow-600 hover:bg-yellow-700"
              >
                Gửi lại
              </Button>
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-[#ff6b5c] hover:bg-[#ff8575] text-white font-semibold"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <Loader2 className="animate-spin" size={18} />
                Đang đăng nhập...
              </span>
            ) : (
              "Đăng nhập"
            )}
          </Button>

          <p className="text-right text-sm mt-1">
            <Link
              href="/auth/forgot-password"
              className="text-blue-400 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </p>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-white text-black"
          >
            Đăng nhập qua Gmail
          </Button>

          <p className="text-center text-sm text-white mt-4">
            Nếu bạn chưa có tài khoản{" "}
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
