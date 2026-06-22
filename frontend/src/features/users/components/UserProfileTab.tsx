"use client";

import React from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineAcademicCap,
  HiOutlineLocationMarker,
  HiOutlinePencil,
} from "react-icons/hi";
import { User } from "@/store/useAuthStore";

interface UserProfileTabProps {
  user: User;
  onEditClick: () => void;
}

export default function UserProfileTab({ user, onEditClick }: UserProfileTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>

      {/* User Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
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
          <div className="flex-1 w-full">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mt-2">
                  {user.role?.charAt(0).toUpperCase() + user.role?.slice(1) || "Student"}
                </span>
              </div>
              <button
                onClick={onEditClick}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
              >
                Edit Profile
              </button>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 text-gray-600">
                <HiOutlineMail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <HiOutlinePhone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm truncate">{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <HiOutlineAcademicCap className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm truncate">
                  {user.department}, {user.university}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <HiOutlineLocationMarker className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm truncate">{user.address}</span>
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed">{user.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
