"use client";

import React from "react";
import Link from "next/link";
import { HiOutlineCalendar } from "react-icons/hi";

export default function UserEventsTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Events</h2>
        <Link
          href="/events"
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors cursor-pointer"
        >
          Browse Events
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
        <div className="text-center text-gray-400">
          <HiOutlineCalendar className="w-20 h-20 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Registered Events</h3>
          <p className="text-sm">
            Start exploring and register for events you're interested in
          </p>
        </div>
      </div>
    </div>
  );
}
