"use client";

import { useState } from "react";
import Image from "next/image";
import { HiStar, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Computer Science Club President",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content:
      "Eventify has transformed how we manage our club events. The analytics dashboard helps us understand our members better, and the registration process is seamless. Our attendance has increased by 40%!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Engineering Student",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content:
      "I never miss an event anymore! The personalized recommendations are spot-on, and I love getting notifications about workshops related to my field. This platform has made campus life so much better.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Arts Society Coordinator",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    content:
      "The best event management platform we've used. Creating events is intuitive, promoting them is easy, and tracking RSVPs is effortless. Our members love the user-friendly interface too!",
    rating: 5,
  },
  {
    name: "David Thompson",
    role: "Business Student",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    content:
      "Eventify connected me with amazing networking events and workshops I wouldn't have known about otherwise. It's become an essential part of my university experience.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="w-full px-4 md:px-10 py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            What Students Are{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Saying
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Join thousands of students who are already experiencing the difference
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl font-serif">"</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Profile Image */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent rounded-full blur opacity-50"></div>
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Rating */}
                <div className="flex gap-1 mb-4 justify-center md:justify-start">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <HiStar key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                  {currentTestimonial.content}
                </p>

                {/* Author Info */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-accent font-semibold">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-3 justify-center md:justify-end mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors group"
                aria-label="Previous testimonial"
              >
                <HiChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 flex items-center justify-center transition-opacity group"
                aria-label="Next testimonial"
              >
                <HiChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex gap-2 justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-3 bg-gradient-to-r from-primary to-accent"
                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              10K+
            </div>
            <div className="text-gray-600 font-semibold">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              500+
            </div>
            <div className="text-gray-600 font-semibold">Registered Clubs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              5K+
            </div>
            <div className="text-gray-600 font-semibold">Events Hosted</div>
          </div>
        </div>
      </div>
    </section>
  );
}
