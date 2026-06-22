'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  HiOutlineMail, 
  HiOutlineLockClosed, 
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { FaGoogle, FaGithub } from 'react-icons/fa';

import { Input } from "@/components/shared/Input";
import { Button } from "@/components/shared/Button";
import { useToast } from "@/components/shared/Toast";
import { apiClient } from "@/services/api/apiClient";
import useAuthStore from "@/store/useAuthStore";

const socialLogins = [
  { icon: FaGoogle, name: "Google", color: "bg-white hover:bg-gray-50 border-gray-200" },
  { icon: FaGithub, name: "GitHub", color: "bg-gray-900 text-white hover:bg-gray-800 border-gray-900" }
];

export default function ClubLoginPage() {
  const router = useRouter();
  const loginClub = useAuthStore((state) => state.loginClub);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      showToast("Please enter both email and password", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.post(
        "api/auth/club/login",
        formData
      );

      if (response.data.success) {
        const resultData = response.data.data;
        // Save to global auth store
        loginClub(resultData, resultData.token || "dummy-token");

        showToast("Login successful! Redirecting...", "success");

        // Redirect to club dashboard after 1 second
        setTimeout(() => {
          router.push("/club/dashboard");
        }, 1000);
      }
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
              <div className="flex items-center justify-center gap-2 mb-2">
                <HiOutlineUserGroup className="text-accent text-3xl animate-pulse" />
                <h2 className="text-2xl font-bold text-gray-900">Club Portal</h2>
              </div>
              <p className="text-gray-500 text-sm">Access your club dashboard</p>
            </div>

            {/* Login Card */}
            <div className="space-y-6">
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
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Club Email Address"
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="club@university.edu"
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
                  placeholder="Enter your password"
                  leftIcon={<HiOutlineLockClosed className="w-5 h-5" />}
                />

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2 cursor-pointer"
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

                <Button
                  type="submit"
                  variant="accent"
                  isLoading={isSubmitting}
                  className="w-full py-3.5"
                >
                  Sign in to Club Portal
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
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
              <div className="pt-4 border-t border-gray-150">
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
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl text-white"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl text-white"></div>
          
          <div className="relative z-10 text-white space-y-6 max-w-md">
            <HiOutlineUserGroup className="w-20 h-20 mx-auto opacity-90 animate-bounce" />
            <h2 className="text-4xl font-black text-center leading-tight">Club Management</h2>
            <p className="text-lg text-center opacity-90">
              Manage your club events, members, and activities all in one place.
            </p>
            <div className="space-y-4 pt-4">
              {[
                { title: "Event Management", desc: "Create and manage club events with ease" },
                { title: "Member Portal", desc: "Track membership and engagement" },
                { title: "Analytics", desc: "Gain insights into your club's performance" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{item.title}</h3>
                    <p className="text-sm opacity-85">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
