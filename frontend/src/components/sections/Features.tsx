"use client";

import { useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineBell,
  HiOutlineChartBar,
  HiOutlineTicket,
  HiOutlineStar,
} from "react-icons/hi";

const features = [
  {
    icon: HiOutlineCalendar,
    title: "Smart Calendar",
    description:
      "Never miss an event with our intelligent calendar that syncs across all your devices and sends timely reminders.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Club Management",
    description:
      "Empower your club with powerful management tools for events, members, and communications all in one place.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: HiOutlineBell,
    title: "Real-time Notifications",
    description:
      "Stay updated with instant notifications about event changes, new registrations, and important announcements.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: HiOutlineChartBar,
    title: "Analytics Dashboard",
    description:
      "Track attendance, engagement, and growth with comprehensive analytics and beautiful visualizations.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: HiOutlineTicket,
    title: "Easy Registration",
    description:
      "Seamless event registration process with QR codes, automatic confirmations, and waitlist management.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: HiOutlineStar,
    title: "Event Discovery",
    description:
      "Discover events tailored to your interests with smart recommendations and personalized event feeds.",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full px-4 md:px-10 py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Everything You Need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Thrive
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Powerful features designed to make campus event management effortless
            and engaging for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent cursor-pointer transform hover:-translate-y-2"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                ></div>

                {/* Icon */}
                <div className="relative mb-5">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Animated Arrow */}
                <div
                  className={`mt-4 flex items-center text-sm font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent transition-all duration-300 ${
                    hoveredIndex === index ? "translate-x-2" : ""
                  }`}
                >
                  Learn more
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
