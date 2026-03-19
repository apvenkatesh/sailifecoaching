import { User, Users } from "lucide-react";

const programs = [
  {
    icon: User,
    label: "One-on-One",
    title: "Individual Coaching",
    description:
      "Personalized coaching sessions tailored entirely to you. We work together to navigate your unique challenges, set meaningful goals, and build the strategies you need to achieve lasting personal growth.",
    cta: "Book a Session",
  },
  {
    icon: Users,
    label: "Community",
    title: "Group Workshops",
    description:
      "Join a supportive group of like-minded individuals in interactive workshops designed for collaboration, shared growth, and self-discovery. A powerful environment for building new skills and friendships.",
    cta: "Join a Workshop",
  },
];

export const CoachingProgramsSection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#1b2a3b] py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-[#c8953d] text-xs tracking-[0.4em] uppercase font-bold mb-4"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            How We Work Together
          </p>
          <h2
            className="text-white text-[44px] font-bold leading-tight tracking-tight"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Coaching Programs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          {programs.map((program, i) => {
            const Icon = program.icon;
            return (
              <div
                key={i}
                className="relative mt-7 border border-white/20 px-10 pt-12 pb-10 flex flex-col gap-5 hover:border-[#c8953d]/70 transition-colors duration-300 group"
              >
                {/* Icon — half outside the card top */}
                <div className="absolute -top-7 left-10 w-14 h-14 rounded-sm bg-white/10 flex items-center justify-center group-hover:bg-[#c8953d] transition-colors duration-300">
                  <Icon
                    className="text-[#c8953d] group-hover:text-white transition-colors duration-300"
                    size={26}
                  />
                </div>

                <p
                  className="text-[#c8953d] text-xs tracking-[0.4em] uppercase font-bold"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {program.label}
                </p>
                <h3
                  className="text-white text-2xl font-bold tracking-wide"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {program.title}
                </h3>
                <p
                  className="text-white/65 text-sm leading-relaxed"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  {program.description}
                </p>
                <button
                  className="self-start px-8 py-3 border border-[#c8953d] text-[#c8953d] text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#c8953d] hover:text-white transition-colors duration-200"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {program.cta}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
