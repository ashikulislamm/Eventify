import Image from "next/image";

export default function Hero() {
  return (
    <div className="mx-auto relative">
      <section className="w-full px-4 md:px-10 py-12 md:py-20 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Hero Content */}
          <div className="flex flex-col gap-6 flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black leading-tight tracking-tight">
              Discover & Manage <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                University Events
              </span>
            </h1>
            <h2 className="text-gray-600 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join the most active clubs, attend exclusive workshops, and never
              miss out on campus life again. Your one-stop platform for student
              engagement.
            </h2>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <button className="flex h-12 px-8 items-center justify-center rounded-lg bg-accent text-white text-base font-bold tracking-wide hover:opacity-90 transition-all transform hover:-translate-y-0.5 hover:shadow-lg shadow-primary/25">
                Explore Events
              </button>
              <button className="flex h-12 px-8 items-center justify-center rounded-lg bg-white border-2 border-gray-200 text-gray-900 text-base font-bold tracking-wide hover:bg-gray-50 transition-all">
                Create an Event
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-full aspect-video rounded-xl shadow-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Group of diverse university students studying together outdoors on campus lawn"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
