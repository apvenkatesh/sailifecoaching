import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophia Johnson",
    role: "Client",
    text: "Working with my coach has been a life changing experience for me. Her guidance in my emotional wellness has helped me to understand myself better, also she helped me to gain confidence to handle my life's ups and down. Through her support, i have gained lots of self confidence to learn and handle my problems in a better way.\n\nI truly feel like I'm working towards a better version of myself, more balanced and more positive to handle problems with a right mindset. If your looking for someone who genuinely cares and help you achieve in your life for emotional growth. I highly recommend her.",
  },
  {
    name: "David Rodriguez",
    role: "Client",
    text: "The life coaching sessions were truly transformative for me. I went in hoping to understand myself better and came out with not only deeper self-awareness but also practical tools to navigate my emotions more effectively. What I really appreciated was how she listened to everything I shared without any judgment. She was so empathetic and really got to the root of what was bothering me. Her techniques were practical and not a one-size-fits-all approach, she adjusted them to what worked best for me. Overall, this journey has been life-changing. I feel more in control and clear-headed and I couldn't be more grateful for her support.",
  },
  {
    name: "Lina Chen",
    role: "Client",
    text: "My experience with meditation and healing has been great. Iam glad with the postive results so far. In this, I realized the negativity i stored in myself for the past years.\n\nThank you for your support. You are friendly and I felt so comfortable talking with you. I feel more relaxing now a days and so much positivity around me.\n\nThank you so much to the gift of healing you gave to me ❤️❤️",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative mt-7 bg-white border border-gray-200 px-8 pt-12 pb-8 flex flex-col gap-5 hover:shadow-lg hover:border-[#c8953d]/50 transition-all duration-300 group"
            >
              {/* Floating icon badge */}
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-[#1b2a3b] flex items-center justify-center group-hover:bg-[#c8953d] transition-colors duration-300">
                <Quote
                  className="text-[#c8953d] group-hover:text-white transition-colors duration-300"
                  size={22}
                />
              </div>

              <p
                className="text-[#555] text-sm leading-relaxed flex-1 whitespace-pre-line"
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
