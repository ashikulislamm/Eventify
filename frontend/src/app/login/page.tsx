"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiCheckCircle,
  HiXCircle,
} from "react-icons/hi";
import { FaGoogle, FaGithub } from "react-icons/fa";

const socialLogins = [
  {
    icon: FaGoogle,
    name: "Google",
    color: "bg-white hover:bg-gray-50 border-gray-200",
  },
  {
    icon: FaGithub,
    name: "GitHub",
    color: "bg-gray-900 text-white hover:bg-gray-800 border-gray-900",
  },
];

import { apiClient } from "@/services/api/apiClient";
import useAuthStore from "@/store/useAuthStore";
import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";

export default function LoginPage() {
  const router = useRouter();
  const loginUser = useAuthStore((state) => state.loginUser);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      const response = await apiClient.post(
        "api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data.success) {
        setSuccess(true);

        const userData = response.data.data;
        // Save to global auth store
        loginUser(userData, userData.token || "dummy-token");

        // Create username for URL (lowercase, no spaces)
        const urlUsername = userData.name.toLowerCase().replace(/\s+/g, "");

        // Show success message for 1 second then redirect to dashboard
        setTimeout(() => {
          router.push(`/user/${urlUsername}`);
        }, 1000);
      }
    } catch (err: any) {
      if (err.message) {
        setError(err.message);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo/Brand */}
          <div className="text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                EVENTIFY
              </h1>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back
            </h2>
            <p className="text-gray-500 text-sm">Please login to your account</p>
          </div>

          {/* Login Card */}
          <div className="space-y-6">
            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3 animate-in fade-in duration-200">
                <HiCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 text-sm">
                    Login Successful!
                  </h3>
                  <p className="text-xs text-green-700 mt-1">
                    Redirecting to dashboard...
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3 animate-in fade-in duration-200">
                <HiXCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 text-sm">Login Failed</h3>
                  <p className="text-xs text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              {socialLogins.map((social, index) => {
                const Icon = social.icon;
                const variantType = social.name === "GitHub" ? "social-black" : "social-white";
                return (
                  <Button
                    key={index}
                    variant={variantType}
                    className="py-3 px-4 w-full"
                    leftIcon={<Icon className="w-5 h-5" />}
                  >
                    {social.name}
                  </Button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white text-gray-400 font-semibold select-none">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                leftIcon={<HiOutlineMail className="w-5 h-5" />}
              />

              <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                leftIcon={<HiOutlineLockClosed className="w-5 h-5" />}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    Remember me
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-primary hover:text-accent transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={success}
                className="w-full py-4 text-base font-bold"
              >
                {success ? "Success!" : "Sign In"}
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-bold text-primary hover:text-accent transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Terms & Privacy */}
          <p className="text-center text-xs text-gray-400 pt-4">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="underline hover:text-gray-600 transition-colors"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline hover:text-gray-600 transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-accent to-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative z-10 max-w-lg text-white">
          <h2 className="text-4xl font-black mb-6">
            Join thousands of event organizers
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Manage your university events seamlessly. Connect with students,
            track attendance, and create memorable experiences.
          </p>
          <div className="space-y-4">
            {[
              { number: "10K+", label: "Active Events" },
              { number: "50K+", label: "Students Connected" },
              { number: "100+", label: "Universities" },
            ].map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <div className="text-3xl font-black">{stat.number}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
