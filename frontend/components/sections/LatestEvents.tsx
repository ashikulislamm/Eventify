import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiArrowRight,
} from "react-icons/hi";

const events = [
  {
    id: 1,
    title: "Annual Campus Hackathon",
    date: "Oct 15 • 10:00 AM",
    location: "Engineering Hall",
    category: "Tech",
    categoryColor: "bg-accent",
    registered: "500+",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Fall Music Night",
    date: "Oct 20 • 7:00 PM",
    location: "Student Union Plaza",
    category: "Social",
    categoryColor: "bg-pink-500",
    registered: "Open Entry",
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "University Career Fair 2024",
    date: "Nov 05 • 9:00 AM",
    location: "Main Auditorium",
    category: "Career",
    categoryColor: "bg-amber-500",
    registered: "Resume Req.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "AI & Machine Learning Workshop",
    date: "Nov 10 • 2:00 PM",
    location: "Tech Lab 3",
    category: "Tech",
    categoryColor: "bg-accent",
    registered: "150+",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Photography Exhibition",
    date: "Nov 15 • 11:00 AM",
    location: "Arts Building",
    category: "Arts",
    categoryColor: "bg-purple-500",
    registered: "Free Entry",
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Startup Pitch Competition",
    date: "Nov 20 • 5:00 PM",
    location: "Innovation Hub",
    category: "Business",
    categoryColor: "bg-blue-500",
    registered: "200+",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function LatestEvents() {
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
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-col rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <div className="absolute top-3 left-3 z-10">
                <span
                  className={`px-3 py-1 rounded-lg ${event.categoryColor} text-white text-xs font-bold uppercase tracking-wider`}
                >
                  {event.category}
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
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-1 text-gray-500 text-xs font-medium uppercase tracking-wide">
                  <HiOutlineCalendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                  <HiOutlineLocationMarker className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {event.registered}
                </span>
                <button className="h-9 px-5 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-all">
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
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
