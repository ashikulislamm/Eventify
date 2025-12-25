import Link from "next/link";
import { HiArrowRight, HiSparkles } from "react-icons/hi";

export default function CTA() {
  return (
    <section className="w-full px-4 md:px-10 py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-accent to-primary p-1">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
          </div>

          {/* Content Container */}
          <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl px-8 md:px-16 py-12 md:py-16">
            <div className="flex flex-col items-center text-center">
              {/* Icon Badge */}
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20">
                <HiSparkles className="w-5 h-5 text-accent" />
                <span className="text-sm font-bold text-gray-700">
                  Get Started Today
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-5xl font-black mb-6 max-w-3xl">
                Ready to Transform Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Campus Experience?
                </span>
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
                Join thousands of students who are already discovering amazing
                events, connecting with clubs, and making the most of their
                university life.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link href="/signup">
                  <button className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white text-lg font-bold rounded-xl hover:shadow-2xl hover:shadow-accent/50 transition-all transform hover:-translate-y-1">
                    Join as Student
                    <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/club/signup">
                  <button className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 text-lg font-bold rounded-xl hover:border-accent hover:text-accent transition-all transform hover:-translate-y-1">
                    Register Your Club
                  </button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap gap-8 justify-center items-center text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-semibold">Free to Join</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-semibold">No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-semibold">10K+ Active Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
