"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineTicket,
  HiOutlineShare,
  HiOutlineHeart,
  HiX,
} from "react-icons/hi";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

// Utility function to generate slug from event title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

import { apiClient } from "@/services/api/apiClient";

export default function EventDetailsPage() {
  const params = useParams();
  const eventSlug = params.id as string;

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    if (eventSlug) {
      fetchEventDetails();
    }
  }, [eventSlug]);

  const fetchEventDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`api/events/slug/${eventSlug}`);
      if (response.data?.success) {
        console.log("Event data received:", response.data.data);
        setEvent(response.data.data);
      } else {
        setError("Event not found");
      }
    } catch (error: any) {
      console.error("Error fetching event:", error);
      setError(error.message || "Failed to load event details");
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">
            Loading event details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Event Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          {error || "The event you are looking for does not exist."}
        </p>
        <Link
          href="/events"
          className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 inline-block"
        >
          Browse All Events
        </Link>
      </div>
    );
  }

  const spotsLeft = event.max_attendees
    ? event.max_attendees - (event.registered_count || 0)
    : null;
  const percentFilled = event.max_attendees
    ? ((event.registered_count || 0) / event.max_attendees) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Section */}
      <section className="relative h-[400px] md:h-[500px] w-full">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary to-accent"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Back Button */}
        <Link
          href="/events"
          className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-900 font-medium hover:bg-white transition-all shadow-lg"
        >
          ← Back to Events
        </Link>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
          >
            <HiOutlineHeart
              className={`w-6 h-6 ${
                isFavorited ? "fill-red-500 text-red-500" : "text-gray-900"
              }`}
            />
          </button>
          <button
            onClick={() => setShowShareModal(true)}
            className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all shadow-lg"
          >
            <HiOutlineShare className="w-6 h-6 text-gray-900" />
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10 py-8 md:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Category */}
            <div>
              <span
                className={`inline-block px-4 py-2 rounded-full ${
                  event.category === "Tech"
                    ? "bg-accent"
                    : event.category === "Social"
                    ? "bg-pink-500"
                    : event.category === "Sports"
                    ? "bg-green-500"
                    : event.category === "Cultural"
                    ? "bg-purple-500"
                    : event.category === "Academic"
                    ? "bg-amber-500"
                    : event.category === "Workshop"
                    ? "bg-blue-500"
                    : event.category === "Conference"
                    ? "bg-indigo-500"
                    : event.category === "Competition"
                    ? "bg-red-500"
                    : "bg-gray-500"
                } text-white text-sm font-bold uppercase tracking-wider mb-4`}
              >
                {event.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                {event.title}
              </h1>

              {/* Event Meta */}
              <div className="flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <HiOutlineCalendar className="w-5 h-5 text-accent" />
                  <span className="font-medium">
                    {new Date(event.start_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineClock className="w-5 h-5 text-accent" />
                  <span className="font-medium">
                    {event.start_time} - {event.end_time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineLocationMarker className="w-5 h-5 text-accent" />
                  <span className="font-medium">
                    {event.venue}, {event.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Organizer */}
            {event.club_name && (
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-200">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {event.club_name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Organized by</p>
                  <p className="text-lg font-bold text-gray-900">
                    {event.club_name}
                  </p>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Event
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {event.description}
              </p>
            </div>

            {/* Highlights */}
            {event.highlights && event.highlights.length > 0 && (
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Event Highlights
                </h2>
                <ul className="space-y-3">
                  {event.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0"></span>
                      <span className="text-gray-600 leading-relaxed">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {event.requirements && event.requirements.length > 0 && (
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {event.requirements.map(
                    (requirement: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="mt-1 w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></span>
                        <span className="text-gray-600 leading-relaxed">
                          {requirement}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Registration Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Registration Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black text-gray-900">
                      {event.entry_fee ? `₹${event.entry_fee}` : "Free Entry"}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <HiOutlineUsers className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {event.registered_count || 0} registered
                      </span>
                    </div>
                  </div>

                  {/* Availability Bar */}
                  {event.max_attendees && (
                    <div className="mt-4">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-primary transition-all"
                          style={{ width: `${percentFilled}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        {spotsLeft && spotsLeft > 0 ? (
                          <span className="text-green-600 font-semibold">
                            {spotsLeft} spots left
                          </span>
                        ) : spotsLeft === 0 ? (
                          <span className="text-red-600 font-semibold">
                            Event Full
                          </span>
                        ) : (
                          <span className="text-gray-600 font-semibold">
                            Unlimited spots
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsRegistered(!isRegistered)}
                  disabled={spotsLeft === 0 && !isRegistered}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
                    isRegistered
                      ? "bg-green-500 hover:bg-green-600"
                      : spotsLeft === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  }`}
                >
                  {isRegistered
                    ? "✓ Registered"
                    : spotsLeft === 0
                    ? "Event Full"
                    : "Register Now"}
                </button>

                {isRegistered && (
                  <p className="text-center text-sm text-green-600 mt-3 font-medium">
                    Check your email for confirmation details
                  </p>
                )}
              </div>

              {/* Club Information */}
              {event.club_name && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Club Information
                  </h3>
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {event.club_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {event.club_name}
                      </h4>
                      {event.club_nickname && (
                        <p className="text-xs text-gray-500">
                          @{event.club_nickname}
                        </p>
                      )}
                    </div>
                  </div>

                  {event.club_description && (
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {event.club_description}
                    </p>
                  )}

                  <div className="space-y-3">
                    {event.club_email && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Email</span>
                        <a
                          href={`mailto:${event.club_email}`}
                          className="text-sm font-semibold text-primary hover:underline break-all text-right"
                        >
                          {event.club_email}
                        </a>
                      </div>
                    )}
                    {event.club_phone && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Phone</span>
                        <a
                          href={`tel:${event.club_phone}`}
                          className="text-sm font-semibold text-gray-900"
                        >
                          {event.club_phone}
                        </a>
                      </div>
                    )}
                    {event.club_website && (
                      <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">Website</span>
                        <a
                          href={event.club_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-primary hover:underline"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                    {event.club_created_at && (
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-600">
                          Registered Since
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {new Date(event.club_created_at).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "short" }
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Event Location
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-gray-600">
                    <HiOutlineLocationMarker className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {event.venue}
                      </p>
                      <p className="text-sm">{event.address}</p>
                      <p className="text-sm">{event.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <HiX className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Share This Event
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                <FaFacebook className="w-6 h-6" />
                <span className="font-semibold">Facebook</span>
              </button>
              <button className="flex items-center justify-center gap-3 px-6 py-4 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors">
                <FaTwitter className="w-6 h-6" />
                <span className="font-semibold">Twitter</span>
              </button>
              <button className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors">
                <FaLinkedin className="w-6 h-6" />
                <span className="font-semibold">LinkedIn</span>
              </button>
              <button className="flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                <FaWhatsapp className="w-6 h-6" />
                <span className="font-semibold">WhatsApp</span>
              </button>
            </div>

            <div className="mt-6">
              <label className="text-sm text-gray-600 font-medium mb-2 block">
                Event Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-sm text-gray-700"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
