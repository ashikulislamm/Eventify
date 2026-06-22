'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineSearch, HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineFilter, HiX, HiOutlineUsers } from 'react-icons/hi';

import { apiClient } from '@/services/api/apiClient';

// Utility function to generate slug from event title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

const categories = [
  { id: 'all', name: 'All Events' },
  { id: 'Tech', name: 'Tech', color: 'bg-accent' },
  { id: 'Social', name: 'Social', color: 'bg-pink-500' },
  { id: 'Sports', name: 'Sports', color: 'bg-green-500' },
  { id: 'Cultural', name: 'Cultural', color: 'bg-purple-500' },
  { id: 'Academic', name: 'Academic', color: 'bg-amber-500' },
  { id: 'Workshop', name: 'Workshop', color: 'bg-blue-500' },
  { id: 'Conference', name: 'Conference', color: 'bg-indigo-500' },
  { id: 'Competition', name: 'Competition', color: 'bg-red-500' },
  { id: 'Other', name: 'Other', color: 'bg-gray-500' }
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("api/events?page=1&limit=100");
      if (response.data?.success) {
        setEvents(response.data.data.events || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-accent text-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Discover Amazing Events
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Find and register for events happening on campus. From tech talks to cultural festivals, there's something for everyone.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                <HiOutlineSearch className="w-6 h-6" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events by name or location..."
                className="w-full pl-14 pr-4 py-4 md:py-5 rounded-2xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all text-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Events Section */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10 py-12">
        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Events' : categories.find(c => c.id === selectedCategory)?.name}
              <span className="text-gray-500 font-normal ml-2">({filteredEvents.length})</span>
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-primary transition-all"
            >
              <HiOutlineFilter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Desktop Categories */}
          <div className="hidden lg:flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Mobile Categories Dropdown */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Filter by Category</h3>
                <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-700">
                  <HiX className="w-6 h-6" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setShowFilters(false);
                    }}
                    className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600 font-semibold">Loading events...</p>
            </div>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Link
                href={`/events/${generateSlug(event.title)}`}
                key={event.id}
                className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`px-3 py-1 rounded-lg ${categories.find(c => c.id === event.category)?.color || 'bg-gray-500'} text-white text-xs font-bold uppercase tracking-wider`}>
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
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <HiOutlineCalendar className="w-16 h-16 text-primary/30" />
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs font-medium uppercase tracking-wide">
                      <HiOutlineCalendar className="w-4 h-4" />
                      <span>{new Date(event.start_date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <HiOutlineLocationMarker className="w-4 h-4" />
                      <span>{event.venue}, {event.city}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {event.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm font-medium text-accent">
                      <HiOutlineUsers className="w-4 h-4" />
                      <span>{event.registered_count || 0} registered</span>
                    </div>
                    <span className="h-9 px-5 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-all flex items-center">
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </section>
    </div>
  );
}
