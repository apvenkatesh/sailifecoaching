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
    <section className="w-full bg-[#f5f4f0] py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-[#c8953d] text-xs tracking-[0.4em] uppercase font-bold mb-4"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            What I Can Help You With
          </p>
          <h2
            className="text-[#1b2a3b] text-[44px] font-bold leading-tight tracking-tight"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 p-8 group hover:shadow-lg hover:border-[#c8953d] transition-all duration-300"
            >
              <div className="w-8 h-0.5 bg-[#c8953d] mb-6 group-hover:w-14 transition-all duration-300" />
              <h3
                className="text-[#1b2a3b] text-lg font-bold mb-3 tracking-wide"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {service.title}
              </h3>
              <p
                className="text-[#666] text-sm leading-relaxed"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
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
