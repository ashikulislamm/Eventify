"use client";

import React from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineAcademicCap,
  HiOutlineGlobe,
  HiOutlineLocationMarker,
  HiOutlineUserGroup,
  HiOutlinePencil,
} from "react-icons/hi";
import { Club } from "@/store/useAuthStore";

interface ProfileTabProps {
  club: Club;
  onEditClick: () => void;
}

export default function ProfileTab({ club, onEditClick }: ProfileTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900">Club Profile</h2>

      {/* Club Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Logo */}
          <div className="relative">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl md:text-5xl font-bold">
              {club.club_name?.charAt(0).toUpperCase() || "C"}
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <HiOutlinePencil className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Club Info */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{club.club_name}</h2>
                {club.nickname && (
                  <p className="text-sm text-gray-500 mt-1">@{club.nickname}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      club.is_verified
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {club.is_verified ? "✓ Verified" : "Pending Verification"}
                  </span>
                </div>
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
                <span className="text-sm truncate">{club.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <HiOutlinePhone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm truncate">{club.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <HiOutlineAcademicCap className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm truncate">{club.university}</span>
              </div>
              {club.website && (
                <div className="flex items-center gap-3 text-gray-600">
                  <HiOutlineGlobe className="w-5 h-5 text-primary flex-shrink-0" />
                  <a
                    href={club.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-primary transition-colors truncate"
                  >
                    {club.website}
                  </a>
                </div>
              )}
              {club.address && (
                <div className="flex items-center gap-3 text-gray-600">
                  <HiOutlineLocationMarker className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm truncate">{club.address}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {club.description && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed">{club.description}</p>
              </div>
            )}

            {/* President Info */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Club President</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <HiOutlineUserGroup className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{club.president_name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <HiOutlineMail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{club.president_email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
