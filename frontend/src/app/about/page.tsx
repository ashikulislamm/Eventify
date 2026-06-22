'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineUsers, HiOutlineCalendar, HiOutlineLightBulb, HiOutlineHeart, HiOutlineSparkles, HiOutlineGlobe } from 'react-icons/hi';
import { FaGraduationCap, FaRocket, FaHandshake } from 'react-icons/fa';

const stats = [
  { number: '10,000+', label: 'Active Students' },
  { number: '500+', label: 'Events Annually' },
  { number: '50+', label: 'Universities' },
  { number: '95%', label: 'Satisfaction Rate' }
];

const values = [
  {
    icon: HiOutlineLightBulb,
    title: 'Innovation',
    description: 'We constantly innovate to provide the best event management experience for universities.'
  },
  {
    icon: HiOutlineUsers,
    title: 'Community',
    description: 'Building strong connections between students, clubs, and organizations across campus.'
  },
  {
    icon: HiOutlineHeart,
    title: 'Passion',
    description: 'We are passionate about creating memorable experiences and fostering campus engagement.'
  },
  {
    icon: HiOutlineSparkles,
    title: 'Excellence',
    description: 'Committed to delivering exceptional quality in every aspect of our platform.'
  }
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
    bio: 'Former student organizer with a vision to revolutionize campus events.'
  },
  {
    name: 'Michael Chen',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    bio: 'Tech enthusiast dedicated to building scalable solutions for education.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Community',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop',
    bio: 'Connecting students and creating vibrant campus communities nationwide.'
  },
  {
    name: 'David Thompson',
    role: 'Lead Designer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
    bio: 'Crafting beautiful and intuitive experiences for every user.'
  }
];

const milestones = [
  {
    year: '2020',
    title: 'The Beginning',
    description: 'Eventify was founded with a mission to transform campus event management.',
    icon: FaRocket
  },
  {
    year: '2021',
    title: 'First 10 Universities',
    description: 'Reached our first milestone of 10 partner universities across the region.',
    icon: FaGraduationCap
  },
  {
    year: '2023',
    title: 'National Expansion',
    description: 'Expanded to 50+ universities nationwide with 100,000+ registered students.',
    icon: HiOutlineGlobe
  },
  {
    year: '2025',
    title: 'Industry Leader',
    description: 'Became the leading platform for university event management and engagement.',
    icon: FaHandshake
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-accent text-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Empowering Campus Communities
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              We're on a mission to make every campus event memorable, accessible, and engaging. 
              Building the future of university event management, one event at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative -mt-12 max-w-[1200px] mx-auto px-4 md:px-10 mb-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
              <HiOutlineCalendar className="w-5 h-5 text-accent" />
              <span className="text-accent font-semibold text-sm">Our Mission</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-gray-900">
              Making Campus Events Accessible to Everyone
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 text-lg">
              At Eventify, we believe that every student deserves access to enriching campus experiences. 
              We're dedicated to breaking down barriers and making event discovery, registration, and 
              participation seamless for everyone.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              From hackathons to cultural festivals, career fairs to social gatherings, we're here to 
              ensure no student misses out on opportunities to learn, connect, and grow.
            </p>
          </div>
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop"
              alt="Students at campus event"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10 py-16 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
            Our Journey
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From a small startup to the leading campus event platform.
          </p>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-6 items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="text-accent font-black text-2xl mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <milestone.icon className="w-8 h-8 text-white" />
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900">
              Meet Our Team
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Passionate individuals working together to revolutionize campus events.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group text-center"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5 shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1 text-gray-900">{member.name}</h3>
                <p className="text-accent font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10 py-16 mb-16">
        <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Ready to Transform Your Campus Experience?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students already using Eventify to discover and attend amazing campus events.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
            >
              Get Started Free
            </Link>
            <Link
              href="/events"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
