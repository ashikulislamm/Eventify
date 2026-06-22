"use client";

import React from "react";
import Link from "next/link";
import { HiOutlineCalendar, HiOutlineUsers } from "react-icons/hi";

// Utility function to generate slug from event title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

interface ClubEvent {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  start_date: string;
  registered_count: number;
}

interface EventsTabProps {
  clubEvents: ClubEvent[];
  loadingEvents: boolean;
  onCreateEventClick: () => void;
}

export default function EventsTab({
  clubEvents,
  loadingEvents,
  onCreateEventClick,
}: EventsTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Events</h2>
        <button
          onClick={onCreateEventClick}
          className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors cursor-pointer"
        >
          Create New Event
        </button>
      </div>

      {loadingEvents ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
          <div className="text-center text-gray-400">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-sm">Loading events...</p>
          </div>
        </div>
      ) : clubEvents.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
          <div className="text-center text-gray-400">
            <HiOutlineCalendar className="w-20 h-20 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Events Yet</h3>
            <p className="text-sm">Create your first event to get started</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${generateSlug(event.title)}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group"
            >
              {event.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {event.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <HiOutlineCalendar className="w-4 h-4" />
                    <span>{new Date(event.start_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HiOutlineUsers className="w-4 h-4" />
                    <span>{event.registered_count || 0} registered</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
