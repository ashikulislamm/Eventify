'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineClock, HiOutlineUsers, HiOutlineTicket, HiOutlineShare, HiOutlineHeart, HiX } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

// Sample event data - In production, this would come from API/database
const eventData: { [key: string]: any } = {
  '1': {
    id: 1,
    title: "Annual Campus Hackathon",
    date: "Oct 15, 2024",
    time: "10:00 AM - 10:00 PM",
    location: "Engineering Hall, Room 302",
    category: "Tech",
    categoryColor: "bg-accent",
    registered: 487,
    capacity: 500,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
    organizer: {
      name: "Tech Club",
      logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&auto=format&fit=crop",
      registeredDate: "Jan 15, 2020",
      members: 250,
      eventsHosted: 45,
      description: "A community of tech enthusiasts passionate about innovation and learning."
    },
    description: "Join us for the biggest hackathon of the year! This 24-hour coding marathon brings together the brightest minds on campus to build innovative solutions to real-world problems. Whether you're a seasoned developer or just starting out, this event offers something for everyone.",
    highlights: [
      "24-hour non-stop coding challenge",
      "$10,000 in prizes for top teams",
      "Mentorship from industry professionals",
      "Free meals and refreshments",
      "Networking opportunities with tech companies",
      "Workshops on latest technologies"
    ],
    schedule: [
      { time: "10:00 AM", activity: "Registration & Check-in" },
      { time: "11:00 AM", activity: "Opening Ceremony" },
      { time: "12:00 PM", activity: "Hacking Begins" },
      { time: "2:00 PM", activity: "Lunch Break" },
      { time: "6:00 PM", activity: "Dinner & Networking" },
      { time: "12:00 AM", activity: "Midnight Snacks" },
      { time: "8:00 AM", activity: "Breakfast" },
      { time: "10:00 AM", activity: "Project Submissions Due" },
      { time: "11:00 AM", activity: "Presentations Begin" },
      { time: "2:00 PM", activity: "Winners Announcement" }
    ],
    requirements: [
      "Laptop with necessary development tools",
      "Valid student ID",
      "Team of 2-4 members (teams can be formed at the event)",
      "Enthusiasm and creativity!"
    ],
    tags: ["Hackathon", "Coding", "Technology", "Competition", "Networking"]
  },
  '2': {
    id: 2,
    title: "Fall Music Night",
    date: "Oct 20, 2024",
    time: "7:00 PM - 11:00 PM",
    location: "Student Union Plaza",
    category: "Social",
    categoryColor: "bg-pink-500",
    registered: 842,
    capacity: 1000,
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1200&auto=format&fit=crop",
    organizer: {
      name: "Music Society",
      logo: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&auto=format&fit=crop",
      registeredDate: "Sep 10, 2019",
      members: 180,
      eventsHosted: 62,
      description: "Bringing together music lovers and artists to create unforgettable experiences."
    },
    description: "Experience an unforgettable evening of live music featuring talented student performers from across campus. From rock bands to acoustic sets, this event celebrates the diverse musical talent of our university community.",
    highlights: [
      "10+ live performances from student artists",
      "Multiple music genres represented",
      "Food trucks and refreshments available",
      "Professional sound and lighting setup",
      "Open mic session for spontaneous performances",
      "Meet and greet with performers"
    ],
    schedule: [
      { time: "7:00 PM", activity: "Doors Open" },
      { time: "7:30 PM", activity: "Opening Act" },
      { time: "8:00 PM", activity: "Main Performances Begin" },
      { time: "9:30 PM", activity: "Open Mic Session" },
      { time: "10:30 PM", activity: "Closing Performance" },
      { time: "11:00 PM", activity: "Event Ends" }
    ],
    requirements: [
      "Student ID required for entry",
      "No outside food or drinks",
      "Respect for performers and fellow attendees"
    ],
    tags: ["Music", "Live Performance", "Entertainment", "Social", "Art"]
  }
};

const similarEvents = [
  {
    id: 3,
    title: "AI Workshop",
    date: "Nov 10",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&auto=format&fit=crop",
    category: "Tech"
  },
  {
    id: 4,
    title: "Career Fair",
    date: "Nov 15",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=400&auto=format&fit=crop",
    category: "Career"
  },
  {
    id: 5,
    title: "Art Exhibition",
    date: "Nov 20",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=400&auto=format&fit=crop",
    category: "Arts"
  }
];

export default function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const { id } = use(params);
  const event = eventData[id] || eventData['1'];
  const spotsLeft = event.capacity - event.registered;
  const percentFilled = (event.registered / event.capacity) * 100;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image Section */}
      <section className="relative h-[400px] md:h-[500px] w-full">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
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
            <HiOutlineHeart className={`w-6 h-6 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} />
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
              <span className={`inline-block px-4 py-2 rounded-full ${event.categoryColor} text-white text-sm font-bold uppercase tracking-wider mb-4`}>
                {event.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                {event.title}
              </h1>
              
              {/* Event Meta */}
              <div className="flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <HiOutlineCalendar className="w-5 h-5 text-accent" />
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineClock className="w-5 h-5 text-accent" />
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineLocationMarker className="w-5 h-5 text-accent" />
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-200">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={event.organizer.logo}
                  alt={event.organizer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Organized by</p>
                <p className="text-lg font-bold text-gray-900">{event.organizer.name}</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {event.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Highlights</h2>
              <ul className="space-y-3">
                {event.highlights.map((highlight: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0"></span>
                    <span className="text-gray-600 leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Schedule */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Schedule</h2>
              <div className="space-y-4">
                {event.schedule.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className="w-24 flex-shrink-0">
                      <span className="text-accent font-bold">{item.time}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Bring</h2>
              <ul className="space-y-3">
                {event.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <HiOutlineTicket className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
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
          </div>

          {/* Right Column - Registration Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Registration Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-black text-gray-900">Free Entry</span>
                    <div className="flex items-center gap-1 text-gray-500">
                      <HiOutlineUsers className="w-5 h-5" />
                      <span className="text-sm font-medium">{event.registered} registered</span>
                    </div>
                  </div>
                  
                  {/* Availability Bar */}
                  <div className="mt-4">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-primary transition-all"
                        style={{ width: `${percentFilled}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {spotsLeft > 0 ? (
                        <span className="text-green-600 font-semibold">{spotsLeft} spots left</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Event Full</span>
                      )}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsRegistered(!isRegistered)}
                  disabled={spotsLeft === 0 && !isRegistered}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
                    isRegistered
                      ? 'bg-green-500 hover:bg-green-600'
                      : spotsLeft === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-accent hover:opacity-90'
                  }`}
                >
                  {isRegistered ? '✓ Registered' : spotsLeft === 0 ? 'Event Full' : 'Register Now'}
                </button>

                {isRegistered && (
                  <p className="text-center text-sm text-green-600 mt-3 font-medium">
                    Check your email for confirmation details
                  </p>
                )}
              </div>

              {/* Club Information */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Club Information</h3>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={event.organizer.logo}
                      alt={event.organizer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{event.organizer.name}</h4>
                    <p className="text-xs text-gray-500">Est. {event.organizer.registeredDate}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {event.organizer.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Total Members</span>
                    <span className="text-sm font-bold text-gray-900">{event.organizer.members}+</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Events Hosted</span>
                    <span className="text-sm font-bold text-gray-900">{event.organizer.eventsHosted}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">Registered Since</span>
                    <span className="text-sm font-bold text-gray-900">{event.organizer.registeredDate}</span>
                  </div>
                </div>

                <Link
                  href={`/clubs/${event.organizer.name.toLowerCase().replace(' ', '-')}`}
                  className="mt-4 block w-full text-center py-3 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-semibold text-gray-900 transition-colors"
                >
                  View Club Profile
                </Link>
              </div>

              {/* Similar Events */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Similar Events</h3>
                <div className="space-y-4">
                  {similarEvents.map((similar) => (
                    <Link
                      key={similar.id}
                      href={`/events/${similar.id}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={similar.image}
                          alt={similar.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 group-hover:text-accent transition-colors line-clamp-2">
                          {similar.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">{similar.date}</p>
                      </div>
                    </Link>
                  ))}
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
            
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Share This Event</h3>
            
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
              <label className="text-sm text-gray-600 font-medium mb-2 block">Event Link</label>
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
