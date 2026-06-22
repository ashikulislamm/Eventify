"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiArrowRight,
} from "react-icons/hi";

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    Tech: "bg-accent",
    Social: "bg-pink-500",
    Sports: "bg-green-500",
    Cultural: "bg-purple-500",
    Academic: "bg-blue-500",
    Workshop: "bg-yellow-500",
    Conference: "bg-indigo-500",
    Competition: "bg-red-500",
    Other: "bg-gray-500",
  };
  return colors[category] || "bg-gray-500";
};

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  venue: string;
  city: string;
  start_date: string;
  start_time: string;
  image?: string;
  registered_count: number;
  max_attendees?: number;
}

export default function LatestEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestEvents = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}api/events?page=1&limit=6`;
        console.log("Fetching events from:", apiUrl);
        
        const response = await fetch(apiUrl);
        console.log("Response status:", response.status);
        
        const result = await response.json();
        console.log("API Result:", result);

        if (response.ok && result.success) {
          // The API returns { events, total, page, totalPages } in result.data
          const eventData = result.data?.events || [];
          console.log("Setting events:", eventData.length, "events");
          setEvents(eventData);
        } else {
          console.error("Failed to fetch events:", result.message);
          setEvents([]); // Set empty array on error
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchLatestEvents();
  }, []);

  const formatDate = (dateString: string, timeString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const time = timeString ? new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "";
    return `${month} ${day}${time ? ` • ${time}` : ""}`;
  };

  if (loading) {
    return (
      <section className="w-full px-4 md:px-10 py-16 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Latest Events
            </h2>
            <p className="text-gray-600">Discover what's happening on campus</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="h-48 w-full bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/3" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-4 md:px-10 py-16 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Latest Events
          </h2>
          <p className="text-gray-600">Discover what's happening on campus</p>
        </div>
        <Link
          href="/events"
          className="hidden sm:flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all hover:gap-3"
        >
          All Events
          <HiArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {!Array.isArray(events) || events.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400">
            <p>No events available at the moment</p>
          </div>
        ) : (
          events.map((event) => {
            const eventSlug = generateSlug(event.title);
            return (
              <Link
                key={event.id}
                href={`/events/${eventSlug}`}
                className="flex flex-col rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute top-3 left-3 z-10">
                    <span
                      className={`px-3 py-1 rounded-lg ${getCategoryColor(event.category)} text-white text-xs font-bold uppercase tracking-wider`}
                    >
                      {event.category}
                    </span>
                  </div>
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl font-bold">
                      {event.title.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex items-center gap-1 text-gray-500 text-xs font-medium uppercase tracking-wide">
                      <HiOutlineCalendar className="w-4 h-4" />
                      <span>{formatDate(event.start_date, event.start_time)}</span>
                    </div>
                    <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                      <HiOutlineLocationMarker className="w-4 h-4" />
                      <span className="line-clamp-1">{event.venue}, {event.city}</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {event.registered_count || 0} registered
                    </span>
                    <span className="h-9 px-5 rounded-lg bg-primary text-white text-sm font-medium group-hover:opacity-90 transition-all flex items-center">
                      Register
                    </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Mobile All Events Button */}
      <div className="sm:hidden text-center">
        <Link
          href="/events"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all w-full"
        >
          All Events
          <HiArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
