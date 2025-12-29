'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineEye, 
  HiOutlineEyeOff, 
  HiOutlineUserGroup,
  HiCheckCircle,
  HiExclamationCircle,
  HiX 
} from 'react-icons/hi';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const socialLogins = [
  { icon: FaGoogle, name: "Google", color: "bg-white hover:bg-gray-50 border-gray-200" },
  { icon: FaGithub, name: "GitHub", color: "bg-gray-900 text-white hover:bg-gray-800 border-gray-900" }
];

interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

export default function ClubLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showToast("Please enter both email and password", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/club/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      // Store club data and token in localStorage
      localStorage.setItem("club", JSON.stringify(result.data));
      localStorage.setItem("clubToken", "dummy-token"); // Replace with actual token from backend
      localStorage.setItem("userType", "club");

      // Dispatch custom event to notify Header component
      window.dispatchEvent(new Event("userLogin"));

      showToast("Login successful! Redirecting...", "success");

      // Redirect to club dashboard after 1 second
      setTimeout(() => {
        router.push("/club/dashboard");
      }, 1000);
    } catch (error: any) {
      console.error("Club login error:", error);
      showToast(error.message || "Login failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex">
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
            <div className="flex items-center justify-center gap-2 mb-2">
              <HiOutlineUserGroup className="text-accent text-3xl" />
              <h2 className="text-2xl font-bold text-gray-900">Club Portal</h2>
            </div>
            <p className="text-gray-500">Access your club dashboard</p>
          </div>

          {/* Login Card */}
          <div className="space-y-6">
            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              {socialLogins.map((social, index) => {
                const Icon = social.icon;
                return (
                  <button
                    key={index}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-medium transition-all shadow-sm hover:shadow ${social.color}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{social.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white text-gray-500 font-medium">Or continue with email</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Club Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <HiOutlineMail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 outline-none focus:border-accent transition-all bg-gray-50 focus:bg-white"
                    placeholder="club@university.edu"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <HiOutlineLockClosed className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-gray-200 outline-none focus:border-accent transition-all bg-gray-50 focus:bg-white"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <HiOutlineEyeOff className="w-5 h-5" />
                    ) : (
                      <HiOutlineEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                  href="/club/forgot-password"
                  className="text-sm font-semibold text-accent hover:text-primary transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-white py-3.5 rounded-xl font-bold hover:bg-primary transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Signing in...</span>
                  </>
                ) : (
                  "Sign in to Club Portal"
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don't have a club account?{' '}
                <Link
                  href="/club/signup"
                  className="font-bold text-accent hover:text-primary transition-colors"
                >
                  Register your club
                </Link>
              </p>
            </div>

            {/* Regular User Link */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500">
                Looking for regular user login?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-accent hover:text-primary transition-colors"
                >
                  User Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Gradient */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary via-accent to-primary items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-white space-y-6 max-w-md">
          <HiOutlineUserGroup className="w-20 h-20 mx-auto opacity-90" />
          <h2 className="text-4xl font-black text-center">Club Management</h2>
          <p className="text-lg text-center opacity-90">
            Manage your club events, members, and activities all in one place.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">Event Management</h3>
                <p className="text-sm opacity-80">Create and manage club events with ease</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">Member Portal</h3>
                <p className="text-sm opacity-80">Track membership and engagement</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">Analytics</h3>
                <p className="text-sm opacity-80">Gain insights into your club's performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-[60] space-y-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 min-w-[320px] max-w-md px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm transform transition-all duration-300 animate-in slide-in-from-right ${
              toast.type === "success"
                ? "bg-green-500/95 text-white"
                : "bg-red-500/95 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <HiCheckCircle className="w-6 h-6 flex-shrink-0" />
            ) : (
              <HiExclamationCircle className="w-6 h-6 flex-shrink-0" />
            )}
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
            >
              <HiX className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      </div>
      <Footer />
    </>
  );
}
