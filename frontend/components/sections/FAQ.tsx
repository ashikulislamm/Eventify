"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const faqs = [
  {
    question: "How do I register for an event?",
    answer:
      "Simply browse through our events page, click on the event you're interested in, and hit the 'Register' button. You'll receive a confirmation email with all the event details and a QR code for check-in.",
  },
  {
    question: "Can I create events for my club?",
    answer:
      "Yes! Register your club through our Club Portal, and you'll get access to our event management dashboard where you can create, manage, and promote your events to the entire campus community.",
  },
  {
    question: "Is Eventify free to use?",
    answer:
      "Eventify is completely free for students to browse and register for events. Clubs and organizations can use our basic features for free, with premium features available for enhanced event management.",
  },
  {
    question: "How do I get notified about new events?",
    answer:
      "Enable notifications in your account settings, and you'll receive real-time alerts about new events, registration confirmations, and event updates. You can customize which types of notifications you want to receive.",
  },
  {
    question: "Can I cancel my event registration?",
    answer:
      "Yes, you can cancel your registration from the 'My Events' section in your dashboard. Please note that cancellation policies may vary by event, and some events may have a cancellation deadline.",
  },
  {
    question: "How do clubs track attendance?",
    answer:
      "Clubs can use our QR code check-in system at events. Attendees simply scan their registration QR code, and attendance is automatically recorded in your club's analytics dashboard with real-time updates.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full px-4 md:px-10 py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Questions
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Got questions? We've got answers. Find everything you need to know
            about Eventify.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-bold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <HiChevronDown
                  className={`w-6 h-6 text-accent flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
          <p className="text-gray-700 mb-4 text-lg">
            Still have questions?
          </p>
          <button className="bg-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-primary transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
