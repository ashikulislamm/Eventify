"use client";

import React from "react";
import { HiOutlineChartBar } from "react-icons/hi";

export default function AnalyticsTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
        <div className="text-center text-gray-400">
          <HiOutlineChartBar className="w-20 h-20 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Analytics Data</h3>
          <p className="text-sm">Analytics will appear once you have events and members</p>
        </div>
      </div>
    </div>
  );
}
