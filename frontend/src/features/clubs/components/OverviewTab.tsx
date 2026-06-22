"use client";

import React from "react";
import {
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineTicket,
  HiOutlineChartBar,
  HiOutlineHome,
} from "react-icons/hi";
import { Club } from "@/store/useAuthStore";

interface OverviewTabProps {
  club: Club;
  onTabChange: (tab: string) => void;
}

export default function OverviewTab({ club, onTabChange }: OverviewTabProps) {
  const stats = [
    {
      icon: HiOutlineCalendar,
      label: "Total Events",
      value: "24",
      color: "bg-blue-500",
    },
    {
      icon: HiOutlineUsers,
      label: "Active Members",
      value: "156",
      color: "bg-green-500",
    },
    {
      icon: HiOutlineTicket,
      label: "Event Registrations",
      value: "842",
      color: "bg-yellow-500",
    },
    {
      icon: HiOutlineChartBar,
      label: "Engagement Rate",
      value: "87%",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Welcome, {club.club_name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your club events and members from your dashboard
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
                <p className="text-xs mt-2">Create an event to get started</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => onTabChange("events")}
                className="w-full bg-primary text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-accent transition-colors text-left flex items-center gap-3 cursor-pointer"
              >
                <HiOutlineCalendar className="w-5 h-5" />
                Create Event
              </button>
              <button
                onClick={() => onTabChange("members")}
                className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-left flex items-center gap-3 cursor-pointer"
              >
                <HiOutlineUsers className="w-5 h-5" />
                Manage Members
              </button>
              <button
                onClick={() => onTabChange("analytics")}
                className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-left flex items-center gap-3 cursor-pointer"
              >
                <HiOutlineChartBar className="w-5 h-5" />
                View Analytics
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
