const testimonials = [
  {
    name: "Sophia Johnson",
    role: "Client",
    text: "Coaching with SP was transformative. She helped me navigate a period of real uncertainty with clarity and compassion. I came away with practical tools and a completely new perspective on what I'm capable of.",
  },
  {
    name: "David Rodriguez",
    role: "Client",
    text: "I was skeptical at first, but after just a few sessions I could feel a genuine shift. SP has an incredible ability to listen deeply and ask the questions that unlock something in you. My confidence and focus have never been stronger.",
  },
  {
    name: "Lina Chen",
    role: "Client",
    text: "The group workshop was exactly what I needed. A safe, uplifting space with people who truly want to grow. SP's energy is contagious, and her methods are both practical and deeply meaningful.",
  },
];

export const ClientTestimonialsSection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#f5f4f0] py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-[#c8953d] text-xs tracking-[0.4em] uppercase font-bold mb-4"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            What Clients Say
          </p>
          <h2
            className="text-[#1b2a3b] text-[44px] font-bold leading-tight tracking-tight"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 p-8 flex flex-col gap-5 hover:shadow-lg transition-shadow duration-300"
            >
              <span
                className="text-[#c8953d] text-5xl leading-none select-none font-bold"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                "
              </span>
              <p
                className="text-[#555] text-sm leading-relaxed flex-1"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {t.text}
              </p>
              <div className="border-t border-gray-200 pt-4">
                <p
                  className="text-[#1b2a3b] font-bold text-sm"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {t.name}
                </p>
                <p
                  className="text-[#c8953d] text-xs tracking-wider uppercase mt-1"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
