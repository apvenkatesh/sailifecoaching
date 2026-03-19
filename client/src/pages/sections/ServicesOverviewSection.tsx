const services = [
  {
    title: "Stress & Resilience",
    description:
      "Feeling overwhelmed? Learn proven techniques to manage stress and build lasting emotional resilience.",
  },
  {
    title: "Clarity & Direction",
    description:
      "Uncertain about your future? Clarify your goals and create a concrete roadmap for success.",
  },
  {
    title: "Motivation & Vision",
    description:
      "Lacking motivation? Reignite your drive with creative visualization and powerful goal-setting strategies.",
  },
  {
    title: "Self-Confidence",
    description:
      "Struggling with self-doubt? Boost your self-esteem and step into your true potential.",
  },
  {
    title: "Community & Connection",
    description:
      "Want to meet like-minded people? Join a supportive community that shares your aspirations.",
  },
  {
    title: "Self-Discovery",
    description:
      "Need direction? Uncover your unique strengths and passions to guide every future decision.",
  },
];

export const ServicesOverviewSection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#fdf9f3] py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-[#bb9774] text-sm tracking-[0.3em] uppercase font-bold mb-4"
            style={{ fontFamily: "'Gayathri', Helvetica" }}
          >
            What I Can Help You With
          </p>
          <h2
            className="text-[#1c2b1c] text-[48px] leading-tight tracking-wide"
            style={{ fontFamily: "'Amiri', Helvetica" }}
          >
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-white border border-[#e8e0d5] p-8 group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-10 h-0.5 bg-[#bb9774] mb-6 group-hover:w-16 transition-all duration-300" />
              <h3
                className="text-[#1c2b1c] text-xl font-bold mb-4 tracking-wide"
                style={{ fontFamily: "'Amiri', Helvetica" }}
              >
                {service.title}
              </h3>
              <p
                className="text-[#555] text-base leading-relaxed"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
