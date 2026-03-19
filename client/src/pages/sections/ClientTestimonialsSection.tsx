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
    <section className="w-full bg-[#fdf9f3] py-24 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-[#bb9774] text-sm tracking-[0.3em] uppercase font-bold mb-4"
            style={{ fontFamily: "'Gayathri', Helvetica" }}
          >
            What Clients Say
          </p>
          <h2
            className="text-[#1c2b1c] text-[48px] leading-tight tracking-wide"
            style={{ fontFamily: "'Amiri', Helvetica" }}
          >
            Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-[#e8e0d5] p-8 flex flex-col gap-6"
            >
              <span
                className="text-[#bb9774] text-6xl leading-none select-none"
                style={{ fontFamily: "'Amiri', Helvetica" }}
              >
                "
              </span>
              <p
                className="text-[#444] text-base leading-relaxed flex-1"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                {t.text}
              </p>
              <div className="border-t border-[#e8e0d5] pt-4">
                <p
                  className="text-[#1c2b1c] font-bold text-base"
                  style={{ fontFamily: "'Gayathri', Helvetica" }}
                >
                  {t.name}
                </p>
                <p
                  className="text-[#bb9774] text-sm tracking-wider uppercase"
                  style={{ fontFamily: "'Gayathri', Helvetica" }}
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
