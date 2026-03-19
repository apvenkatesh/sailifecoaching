import {
  ShieldCheck,
  Compass,
  Lightbulb,
  Trophy,
  Users,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: ShieldCheck,
    title: "Stress & Resilience",
    description:
      "Learn proven techniques to manage stress and build lasting emotional resilience.",
  },
  {
    icon: Compass,
    title: "Clarity & Direction",
    description:
      "Clarify your goals and create a concrete roadmap for success.",
  },
  {
    icon: Lightbulb,
    title: "Motivation & Vision",
    description:
      "Reignite your drive with creative visualization and powerful goal-setting strategies.",
  },
  {
    icon: Trophy,
    title: "Self-Confidence",
    description:
      "Boost your self-esteem and step fully into your true potential.",
  },
  {
    icon: Users,
    title: "Community & Connection",
    description:
      "Join a supportive community of like-minded people who share your aspirations.",
  },
  {
    icon: Sparkles,
    title: "Self-Discovery",
    description:
      "Uncover your unique strengths and passions to guide every future decision.",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="relative mt-7 bg-white border border-gray-200 text-center px-8 pt-12 pb-8 group hover:shadow-lg hover:border-[#c8953d] transition-all duration-300"
              >
                {/* Icon — half outside the card top */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#1b2a3b] flex items-center justify-center group-hover:bg-[#c8953d] transition-colors duration-300">
                  <Icon
                    className="text-[#c8953d] group-hover:text-white transition-colors duration-300"
                    size={28}
                  />
                </div>

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
            );
          })}
        </div>
      </div>
    </section>
  );
};
