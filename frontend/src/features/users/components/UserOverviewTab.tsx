"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineCalendar,
  HiOutlineStar,
  HiOutlineTicket,
} from "react-icons/hi";
import { User } from "@/store/useAuthStore";

interface UserOverviewTabProps {
  user: User;
  onTabChange: (tab: string) => void;
}

export default function UserOverviewTab({
  user,
  onTabChange,
}: UserOverviewTabProps) {
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
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your events today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} rounded-lg p-3 text-white`}>
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
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/events"
                className="w-full bg-primary text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent transition-colors text-left flex items-center gap-3 cursor-pointer"
              >
                <HiOutlineCalendar className="w-5 h-5" />
                Browse Events
              </Link>
              <button
                onClick={() => onTabChange("favorites")}
                className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-left flex items-center gap-3 cursor-pointer"
              >
                <HiOutlineStar className="w-5 h-5" />
                View Favorites
              </button>
              <button
                onClick={() => onTabChange("tickets")}
                className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-left flex items-center gap-3 cursor-pointer"
              >
                <HiOutlineTicket className="w-5 h-5" />
                My Registrations
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
