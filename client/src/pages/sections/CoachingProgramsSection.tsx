const programs = [
  {
    label: "One-on-One",
    title: "Individual Coaching",
    description:
      "Personalized coaching sessions tailored entirely to you. We work together to navigate your unique challenges, set meaningful goals, and build the strategies you need to achieve lasting personal growth.",
    cta: "Book a Session",
  },
  {
    label: "Community",
    title: "Group Workshops",
    description:
      "Join a supportive group of like-minded individuals in interactive workshops designed for collaboration, shared growth, and self-discovery. A powerful environment for building new skills and friendships.",
    cta: "Join a Workshop",
  },
];

export const CoachingProgramsSection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#1c2b1c] py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-[#bb9774] text-sm tracking-[0.3em] uppercase font-bold mb-4"
            style={{ fontFamily: "'Gayathri', Helvetica" }}
          >
            How We Work Together
          </p>
          <h2
            className="text-white text-[48px] leading-tight tracking-wide"
            style={{ fontFamily: "'Amiri', Helvetica" }}
          >
            Coaching Programs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, i) => (
            <div
              key={i}
              className="border border-white/20 p-10 flex flex-col gap-6 hover:border-[#bb9774]/60 transition-colors duration-300"
            >
              <p
                className="text-[#bb9774] text-xs tracking-[0.3em] uppercase font-bold"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                {program.label}
              </p>
              <h3
                className="text-white text-3xl tracking-wide"
                style={{ fontFamily: "'Amiri', Helvetica" }}
              >
                {program.title}
              </h3>
              <p
                className="text-white/70 text-base leading-relaxed flex-1"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                {program.description}
              </p>
              <button
                className="self-start px-8 py-3 border border-[#bb9774] text-[#bb9774] text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#bb9774] hover:text-white transition-colors duration-200"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                {program.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
