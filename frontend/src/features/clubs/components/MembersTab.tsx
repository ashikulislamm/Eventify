"use client";

import React from "react";
import { HiOutlineUsers } from "react-icons/hi";

export default function MembersTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Members</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors cursor-pointer">
          Add Member
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
        <div className="text-center text-gray-400">
          <HiOutlineUsers className="w-20 h-20 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Members Yet</h3>
          <p className="text-sm">Start adding members to your club</p>
        </div>
      </div>
    </div>
  );
}
