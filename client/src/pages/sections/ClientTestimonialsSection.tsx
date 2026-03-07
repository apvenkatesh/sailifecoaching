import { Separator } from "@/components/ui/separator";

const testimonials = [
  {
    name: "Sophia Johnson",
    text: "Our individual coaching sessions provide personalized guidance and support to help clients navigate challenges, set meaningful goals, and achieve personal growth. We work collaboratively with individuals to develop strategies for success and empower them to lead fulfilling lives.",
  },
  {
    name: "David Rodriguez",
    text: "Our individual coaching sessions provide personalized guidance and support to help clients navigate challenges, set meaningful goals, and achieve personal growth. We work collaboratively with individuals to develop strategies for success and empower them to lead fulfilling lives. Our individual coaching sessions provide personalized guidance and support to help clients navigate challenges, set meaningful goals, and achieve personal growth. We work collaboratively with individuals to develop strategies for success and empower them to lead fulfilling lives.",
  },
  {
    name: "Lina Chen",
    text: "Our individual coaching sessions provide personalized guidance and support to help clients navigate challenges, set meaningful goals, and achieve personal growth. We work collaboratively with individuals to develop strategies for success and empower them to lead fulfilling lives.",
  },
];

export const ClientTestimonialsSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-[#bb9774] border border-solid border-[#ba9777] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="[-webkit-text-stroke:1px_#ba9777] [font-family:'Amiri',Helvetica] font-normal text-[#fff9e4] text-[55px] text-center tracking-[2.75px] leading-normal mb-16">
          CLIENT TESTIMONIALS
        </h2>

        <div className="max-w-4xl mx-auto mb-16">
          <p className="[-webkit-text-stroke:1px_#ba9777] text-[#fff9e4] text-[22px] tracking-[0.44px] leading-[45px] [font-family:'Gayathri',Helvetica] font-bold text-center">
            Our individual coaching sessions provide personalized guidance and
            support to help clients navigate challenges, set meaningful goals,
            and achieve personal growth. We work collaboratively with
            individuals to develop strategies for success and empower them to
            lead fulfilling lives.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              {index > 0 && <Separator className="bg-[#ba9777] h-0.5 mb-8" />}
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
                <div className="[-webkit-text-stroke:1px_#ba9777] [font-family:'Gayathri',Helvetica] font-bold text-[#fff9e4] text-2xl text-center md:text-left whitespace-nowrap">
                  {testimonial.name}
                </div>
                <div className="[-webkit-text-stroke:1px_#ba9777] text-[#fff9e4] text-[22px] tracking-[0.44px] leading-[45px] [font-family:'Gayathri',Helvetica] font-bold">
                  {testimonial.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
