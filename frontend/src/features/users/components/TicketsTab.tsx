"use client";

import React from "react";
import { HiOutlineTicket } from "react-icons/hi";

export default function TicketsTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900">My Tickets</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
        <div className="text-center text-gray-400">
          <HiOutlineTicket className="w-20 h-20 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Tickets</h3>
          <p className="text-sm">Your event tickets will appear here after registration</p>
        </div>
      </div>
    </div>
  );
}
