"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineUserGroup,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineAcademicCap,
  HiOutlineIdentification,
} from "react-icons/hi";
import { FaGoogle, FaGithub } from "react-icons/fa";

const socialSignups = [
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

export default function ClubSignUpPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    clubName: "",
    email: "",
    phone: "",
    university: "",
    description: "",
    presidentName: "",
    presidentEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const steps = [
    { number: 1, title: "Club Information" },
    { number: 2, title: "President Information" },
    { number: 3, title: "Security" },
  ];

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.clubName &&
          formData.email &&
          formData.phone &&
          formData.university &&
          formData.description
        );
      case 2:
        return formData.presidentName && formData.presidentEmail;
      case 3:
        return (
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword &&
          agreeToTerms
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Please fill in all required fields");
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    console.log("Club signup attempt:", formData);
    // Handle club signup logic
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white py-12">
        <div className="w-full max-w-md space-y-6">
          {/* Logo/Brand */}
          <div className="text-center">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                EVENTIFY
              </h1>
            </Link>
            <div className="flex items-center justify-center gap-2 mb-2">
              <HiOutlineUserGroup className="text-accent text-3xl" />
              <h2 className="text-2xl font-bold text-gray-900">
                Register Your Club
              </h2>
            </div>
            <p className="text-gray-500">
              Join the community of student organizations
            </p>
          </div>

          {/* Signup Card */}
          <div className="space-y-6">
            {/* Progress Indicator */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                          currentStep >= step.number
                            ? "bg-accent text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {currentStep > step.number ? "✓" : step.number}
                      </div>
                      <span
                        className={`text-xs mt-2 font-medium ${
                          currentStep >= step.number
                            ? "text-accent"
                            : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-1 flex-1 mx-2 rounded transition-all ${
                          currentStep > step.number
                            ? "bg-accent"
                            : "bg-gray-200"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Signup - Only show on first step */}
            {/*{currentStep === 1 && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  {socialSignups.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <button
                        key={index}
                        type="button"
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-medium transition-all shadow-sm hover:shadow ${social.color}`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm">{social.name}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-white text-gray-500 font-medium">
                      Or register with email
                    </span>
                  </div>
                </div>
              </>
            )}*/}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Club Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Club Information
                  </h3>

                  {/* Club Name Field */}
                  <div>
                    <label
                      htmlFor="clubName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Club Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <HiOutlineUserGroup className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        id="clubName"
                        name="clubName"
                        value={formData.clubName}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-accent transition-all bg-gray-50 focus:bg-white"
                        placeholder="e.g., Computer Science Club"
                      />
                    </div>
                  </div>

                  {/* Club Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Club Email
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
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-accent transition-all bg-gray-50 focus:bg-white"
                        placeholder="club@university.edu"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Contact Phone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <HiOutlinePhone className="w-5 h-5" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-accent transition-all bg-gray-50 focus:bg-white"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* University */}
                  <div>
                    <label
                      htmlFor="university"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      University/Institution
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <HiOutlineAcademicCap className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        id="university"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-accent transition-all bg-gray-50 focus:bg-white"
                        placeholder="e.g., State University"
                      />
                    </div>
                  </div>

                  {/* Club Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Club Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-accent transition-all bg-gray-50 focus:bg-white resize-none"
                      placeholder="Brief description of your club's mission and activities..."
                    />
                  </div>
                </div>
              )}

              {/* Step 2: President Information */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    President Information
                  </h3>

                  {/* President Name */}
                  <div>
                    <label
                      htmlFor="presidentName"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      President Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <HiOutlineIdentification className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        id="presidentName"
                        name="presidentName"
                        value={formData.presidentName}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-accent transition-all bg-gray-50 focus:bg-white"
                        placeholder="Full name"
                      />
                    </div>
                  </div>

                  {/* President Email */}
                  <div>
                    <label
                      htmlFor="presidentEmail"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      President Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <HiOutlineMail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        id="presidentEmail"
                        name="presidentEmail"
                        value={formData.presidentEmail}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-accent transition-all bg-gray-50 focus:bg-white"
                        placeholder="president@university.edu"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Security */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                    Security
                  </h3>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
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
                        className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-accent transition-all bg-gray-50 focus:bg-white"
                        placeholder="Create a strong password"
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

                  {/* Confirm Password Field */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <HiOutlineLockClosed className="w-5 h-5" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 outline-none focus:border-accent transition-all bg-gray-50 focus:bg-white"
                        placeholder="Re-enter your password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <HiOutlineEyeOff className="w-5 h-5" />
                        ) : (
                          <HiOutlineEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2 mt-0.5"
                    />
                    <label
                      htmlFor="agreeToTerms"
                      className="text-sm text-gray-600"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-accent font-semibold hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-accent font-semibold hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3 pt-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="flex-1 bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-300 transition-all"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 bg-accent text-white py-3.5 rounded-xl font-bold hover:bg-primary transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-1 bg-accent text-white py-3.5 rounded-xl font-bold hover:bg-primary transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Register Club
                  </button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have a club account?{" "}
                <Link
                  href="/club/login"
                  className="font-bold text-accent hover:text-primary transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Regular User Link */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500">
                Looking for regular user signup?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-accent hover:text-primary transition-colors"
                >
                  User Signup
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
          <h2 className="text-4xl font-black text-center">
            Why Register Your Club?
          </h2>
          <p className="text-lg text-center opacity-90">
            Access powerful tools to grow and manage your student organization
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">Event Publishing</h3>
                <p className="text-sm opacity-80">
                  Create and promote events to the entire campus
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">Member Management</h3>
                <p className="text-sm opacity-80">
                  Track attendance and engagement seamlessly
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">Analytics Dashboard</h3>
                <p className="text-sm opacity-80">
                  Get insights to grow your club's reach
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-sm font-bold">✓</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">Communication Tools</h3>
                <p className="text-sm opacity-80">
                  Notify members about updates instantly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
