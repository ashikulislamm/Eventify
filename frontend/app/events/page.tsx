'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineSearch, HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineFilter, HiX } from 'react-icons/hi';

const categories = [
  { id: 'all', name: 'All Events' },
  { id: 'tech', name: 'Tech', color: 'bg-accent' },
  { id: 'social', name: 'Social', color: 'bg-pink-500' },
  { id: 'career', name: 'Career', color: 'bg-amber-500' },
  { id: 'arts', name: 'Arts', color: 'bg-purple-500' },
  { id: 'sports', name: 'Sports', color: 'bg-green-500' },
  { id: 'business', name: 'Business', color: 'bg-blue-500' }
];

const allEvents = [
  {
    id: 1,
    title: "Annual Campus Hackathon",
    date: "Oct 15 • 10:00 AM",
    location: "Engineering Hall",
    category: "tech",
    categoryColor: "bg-accent",
    registered: "500+",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    description: "24-hour coding competition with prizes worth $10,000"
  },
  {
    id: 2,
    title: "Fall Music Night",
    date: "Oct 20 • 7:00 PM",
    location: "Student Union Plaza",
    category: "social",
    categoryColor: "bg-pink-500",
    registered: "Open Entry",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1200&auto=format&fit=crop",
    description: "Live performances from student bands and artists"
  },
  {
    id: 3,
    title: "University Career Fair 2024",
    date: "Nov 05 • 9:00 AM",
    location: "Main Auditorium",
    category: "career",
    categoryColor: "bg-amber-500",
    registered: "Resume Req.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
    description: "Meet recruiters from top companies and explore opportunities"
  },
  {
    id: 4,
    title: "AI & Machine Learning Workshop",
    date: "Nov 10 • 2:00 PM",
    location: "Tech Lab 3",
    category: "tech",
    categoryColor: "bg-accent",
    registered: "150+",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    description: "Hands-on workshop on latest AI technologies and applications"
  },
  {
    id: 5,
    title: "Photography Exhibition",
    date: "Nov 15 • 11:00 AM",
    location: "Arts Building",
    category: "arts",
    categoryColor: "bg-purple-500",
    registered: "Free Entry",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop",
    description: "Showcase of stunning photography work by students"
  },
  {
    id: 6,
    title: "Startup Pitch Competition",
    date: "Nov 20 • 5:00 PM",
    location: "Innovation Hub",
    category: "business",
    categoryColor: "bg-blue-500",
    registered: "200+",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop",
    description: "Pitch your startup idea and win funding opportunities"
  },
  {
    id: 7,
    title: "Basketball Tournament",
    date: "Nov 25 • 4:00 PM",
    location: "Sports Complex",
    category: "sports",
    categoryColor: "bg-green-500",
    registered: "300+",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop",
    description: "Inter-department basketball championship"
  },
  {
    id: 8,
    title: "Cultural Fest 2024",
    date: "Dec 01 • 6:00 PM",
    location: "Main Campus Ground",
    category: "social",
    categoryColor: "bg-pink-500",
    registered: "1000+",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1200&auto=format&fit=crop",
    description: "Celebrate diversity with music, food, and performances"
  },
  {
    id: 9,
    title: "Design Thinking Workshop",
    date: "Dec 05 • 1:00 PM",
    location: "Design Studio",
    category: "business",
    categoryColor: "bg-blue-500",
    registered: "100+",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
    description: "Learn design thinking principles and methodologies"
  }
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
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
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute top-3 left-3 z-10">
                    <span className={`px-3 py-1 rounded-lg ${event.categoryColor} text-white text-xs font-bold uppercase tracking-wider`}>
                      {categories.find(c => c.id === event.category)?.name}
                    </span>
                  </div>
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="flex items-center gap-1 text-gray-500 text-xs font-medium uppercase tracking-wide">
                      <HiOutlineCalendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <HiOutlineLocationMarker className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                      {event.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {event.registered}
                    </span>
                    <Link
                      href={`/events/${event.id}`}
                      className="h-9 px-5 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-all flex items-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
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
