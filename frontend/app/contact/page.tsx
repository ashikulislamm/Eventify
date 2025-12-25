'use client';

import { useState } from 'react';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlinePaperAirplane } from 'react-icons/hi';
import { FaTwitter, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const contactInfo = [
  {
    icon: HiOutlineMail,
    title: "Email Us",
    content: "support@eventify.com",
    href: "mailto:support@eventify.com"
  },
  {
    icon: HiOutlinePhone,
    title: "Call Us",
    content: "+1 (555) 123-4567",
    href: "tel:+15551234567"
  },
  {
    icon: HiOutlineLocationMarker,
    title: "Visit Us",
    content: "123 University Ave, Campus City",
    href: "#"
  }
];

const socialLinks = [
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaGithub, href: "#", label: "GitHub" }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="w-full px-4 md:px-10 py-16 md:py-24 max-w-[1200px] mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
          Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Touch</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Have questions about our platform? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="w-full px-4 md:px-10 pb-16 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <a
                key={index}
                href={info.href}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{info.title}</h3>
                <p className="text-gray-600">{info.content}</p>
              </a>
            );
          })}
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="w-full px-4 md:px-10 py-16 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-2">Send us a message</h2>
              <p className="text-gray-600 mb-8">Fill out the form below and we'll respond within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <HiOutlinePaperAirplane className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* Side Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Office Hours */}
            <div className="bg-gradient-to-br from-primary to-accent text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Office Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between border-b border-white/20 pb-2">
                  <span>Saturday</span>
                  <span className="font-semibold">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Quick Answers</h3>
              <p className="text-gray-600 mb-6">
                Looking for instant answers? Check out our comprehensive FAQ section for common questions.
              </p>
              <a
                href="/faq"
                className="inline-flex items-center justify-center w-full bg-white border-1 border-gray-100 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all"
              >
                Visit FAQ
              </a>
            </div>

            {/* Social Links */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
              <p className="text-gray-600 mb-6">Follow us on social media for updates and news.</p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-12 h-12 rounded-lg bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
