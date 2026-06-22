"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUserGroup,
  HiOutlinePhone,
  HiOutlineAcademicCap,
  HiOutlineIdentification,
} from "react-icons/hi";

import { Input } from "@/components/shared/Input";
import { TextArea } from "@/components/shared/TextArea";
import { Button } from "@/components/shared/Button";
import { useToast } from "@/components/shared/Toast";
import { apiClient } from "@/services/api/apiClient";

export default function ClubSignUpPage() {
  const router = useRouter();
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
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

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
      showToast("Please fill in all required fields", "error");
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }
    if (!agreeToTerms) {
      showToast("Please agree to the terms and conditions", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiClient.post("api/clubs/register", formData);

      if (response.data.success) {
        showToast("Club registered successfully! Redirecting to login...", "success");

        setFormData({
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
        setAgreeToTerms(false);
        setCurrentStep(1);

        setTimeout(() => {
          router.push("/club/login");
        }, 2000);
      }
    } catch (error: any) {
      console.error("Club registration error:", error);
      showToast(error.message || "Failed to register club. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
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
    <>
      <Header />
      <div className="min-h-screen flex bg-white">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md space-y-6">
            {/* Logo/Brand */}
            <div className="text-center">
              <Link href="/" className="inline-block">
                <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">
                  EVENTIFY
                </h1>
              </Link>
              <div className="flex items-center justify-center gap-2 mb-2">
                <HiOutlineUserGroup className="text-accent text-3xl animate-pulse" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Register Your Club
                </h2>
              </div>
              <p className="text-gray-500 text-sm">
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
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-sm ${
                            currentStep >= step.number
                              ? "bg-accent text-white"
                              : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {currentStep > step.number ? "✓" : step.number}
                        </div>
                        <span
                          className={`text-xs mt-2 font-semibold ${
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
                              : "bg-gray-100"
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Step 1: Club Information */}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Club Information
                    </h3>

                    <Input
                      label="Club Name"
                      type="text"
                      id="clubName"
                      name="clubName"
                      value={formData.clubName}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Computer Science Club"
                      leftIcon={<HiOutlineUserGroup className="w-5 h-5" />}
                    />

                    <Input
                      label="Club Email"
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
                      label="Contact Phone"
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 000-0000"
                      leftIcon={<HiOutlinePhone className="w-5 h-5" />}
                    />

                    <Input
                      label="University/Institution"
                      type="text"
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      required
                      placeholder="e.g., State University"
                      leftIcon={<HiOutlineAcademicCap className="w-5 h-5" />}
                    />

                    <TextArea
                      label="Club Description"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={3}
                      placeholder="Brief description of your club's mission and activities..."
                    />
                  </div>
                )}

                {/* Step 2: President Information */}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      President Information
                    </h3>

                    <Input
                      label="President Name"
                      type="text"
                      id="presidentName"
                      name="presidentName"
                      value={formData.presidentName}
                      onChange={handleChange}
                      required
                      placeholder="Full name"
                      leftIcon={<HiOutlineIdentification className="w-5 h-5" />}
                    />

                    <Input
                      label="President Email"
                      type="email"
                      id="presidentEmail"
                      name="presidentEmail"
                      value={formData.presidentEmail}
                      onChange={handleChange}
                      required
                      placeholder="president@university.edu"
                      leftIcon={<HiOutlineMail className="w-5 h-5" />}
                    />
                  </div>
                )}

                {/* Step 3: Security */}
                {currentStep === 3 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                      Security
                    </h3>

                    <Input
                      label="Password"
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Create a strong password"
                      leftIcon={<HiOutlineLockClosed className="w-5 h-5" />}
                    />

                    <Input
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Re-enter your password"
                      leftIcon={<HiOutlineLockClosed className="w-5 h-5" />}
                    />

                    {/* Terms and Conditions */}
                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent focus:ring-2 mt-0.5 cursor-pointer"
                      />
                      <label
                        htmlFor="agreeToTerms"
                        className="text-sm text-gray-600 select-none cursor-pointer"
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
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="flex-1 py-3.5"
                    >
                      Previous
                    </Button>
                  )}
                  {currentStep < 3 ? (
                    <Button
                      variant="accent"
                      onClick={handleNext}
                      className="flex-1 py-3.5"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="accent"
                      isLoading={isSubmitting}
                      className="flex-1 py-3.5"
                    >
                      Register Club
                    </Button>
                  )}
                </div>
              </form>

              {/* Login Link */}
              <div className="text-center pt-2">
                <p className="text-sm text-gray-600">
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
              <div className="pt-4 border-t border-gray-150">
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
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl text-white"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl text-white"></div>

          <div className="relative z-10 text-white space-y-6 max-w-md">
            <HiOutlineUserGroup className="w-20 h-20 mx-auto opacity-90" />
            <h2 className="text-4xl font-black text-center leading-tight">
              Why Register Your Club?
            </h2>
            <p className="text-lg text-center opacity-90">
              Access powerful tools to grow and manage your student organization
            </p>
            <div className="space-y-4 pt-4">
              {[
                {
                  title: "Event Publishing",
                  desc: "Create and promote events to the entire campus",
                },
                {
                  title: "Member Management",
                  desc: "Track attendance and engagement seamlessly",
                },
                {
                  title: "Analytics Dashboard",
                  desc: "Get insights to grow your club's reach",
                },
                {
                  title: "Communication Tools",
                  desc: "Notify members about updates instantly",
                },
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
