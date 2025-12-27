"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineStar,
  HiOutlineTicket,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineAcademicCap,
  HiOutlinePencil,
} from "react-icons/hi";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  university: string;
  department: string;
  role: string;
  avatar?: string;
  bio?: string;
}

export default function UserDashboard() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Verify that the username in URL matches logged-in user
      // Convert name to URL format (lowercase, replace spaces with nothing or underscore)
      const urlUsername = parsedUser.name.toLowerCase().replace(/\s+/g, "");
      if (urlUsername !== username.toLowerCase()) {
        // Redirect to correct username URL
        router.push(`/user/${urlUsername}`);
      }
    } else {
      // Not logged in, redirect to login
      router.push("/login");
    }
    setLoading(false);
  }, [username, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = [
    {
      icon: HiOutlineTicket,
      label: "Registered Events",
      value: "12",
      color: "bg-blue-500",
    },
    {
      icon: HiOutlineCalendar,
      label: "Upcoming Events",
      value: "5",
      color: "bg-green-500",
    },
    {
      icon: HiOutlineStar,
      label: "Favorite Events",
      value: "8",
      color: "bg-yellow-500",
    },
    {
      icon: HiOutlineTicket,
      label: "Past Events",
      value: "7",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your events today.
          </p>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl md:text-5xl font-bold">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <HiOutlinePencil className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {user.name}
                  </h2>
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mt-2">
                    {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || "Student"}
                  </span>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-accent transition-colors">
                  Edit Profile
                </button>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <HiOutlineMail className="w-5 h-5 text-primary" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <HiOutlinePhone className="w-5 h-5 text-primary" />
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <HiOutlineAcademicCap className="w-5 h-5 text-primary" />
                  <span className="text-sm">
                    {user.department}, {user.university}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <HiOutlineLocationMarker className="w-5 h-5 text-primary" />
                  <span className="text-sm">{user.address}</span>
                </div>
              </div>

              {/* Bio */}
              {user.bio && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-gray-600 text-sm">{user.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`${stat.color} rounded-lg p-3 text-white`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineCalendar className="w-6 h-6 text-primary" />
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {/* Placeholder for upcoming events */}
                <div className="text-center py-12 text-gray-400">
                  <HiOutlineCalendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">No upcoming events</p>
                  <p className="text-xs mt-2">
                    Browse events to register for activities
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-primary text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent transition-colors text-left flex items-center gap-3">
                  <HiOutlineCalendar className="w-5 h-5" />
                  Browse Events
                </button>
                <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-left flex items-center gap-3">
                  <HiOutlineStar className="w-5 h-5" />
                  View Favorites
                </button>
                <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-left flex items-center gap-3">
                  <HiOutlineTicket className="w-5 h-5" />
                  My Registrations
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">No recent activity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
