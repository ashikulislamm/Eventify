import {
  HiOutlineSearch,
  HiOutlineTicket,
  HiOutlineUserGroup,
} from "react-icons/hi";

const steps = [
  {
    icon: HiOutlineSearch,
    title: "Discover",
    description:
      "Browse hundreds of events from tech talks to music nights happening right on campus.",
  },
  {
    icon: HiOutlineTicket,
    title: "Register",
    description:
      "Secure your spot instantly with one click. Manage your tickets and schedule easily.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Attend",
    description:
      "Show up, check in with your digital pass, and connect with fellow students.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-gray-50 py-16 border-y border-gray-100">
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            How Eventify Works
          </h2>
          <p className="text-gray-600 text-lg">
            Three simple steps to make the most of your campus experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white hover:shadow-lg hover:scale-105 hover:transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-primary mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
