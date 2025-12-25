'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const socialLogins = [
  { icon: FaGoogle, name: "Google", color: "bg-white hover:bg-gray-50 border-gray-200" },
  { icon: FaGithub, name: "GitHub", color: "bg-gray-900 text-white hover:bg-gray-800 border-gray-900" }
];

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Handle login logic
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-500">Please login to your account</p>
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
                <span className="px-2 bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
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
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-1 border-gray-100 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="you@example.com"
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
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border-1 border-gray-100 outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
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
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm font-semibold text-primary hover:text-accent transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/signup" className="font-bold text-primary hover:text-accent transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Terms & Privacy */}
          <p className="text-center text-xs text-gray-400 pt-4">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-gray-600 transition-colors">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="underline hover:text-gray-600 transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-accent to-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative z-10 max-w-lg text-white">
          <h2 className="text-4xl font-black mb-6">Join thousands of event organizers</h2>
          <p className="text-lg text-white/90 mb-8">
            Manage your university events seamlessly. Connect with students, track attendance, and create memorable experiences.
          </p>
          <div className="space-y-4">
            {[
              { number: "10K+", label: "Active Events" },
              { number: "50K+", label: "Students Connected" },
              { number: "100+", label: "Universities" }
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
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
