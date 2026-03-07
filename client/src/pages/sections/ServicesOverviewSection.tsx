import { Separator } from "@/components/ui/separator";

const servicesData = [
  {
    text: "Feeling Stressed or Overwhelmed? Learn techniques to manage stress and build emotional resilience.",
  },
  {
    text: "Uncertain About Your Future? Clarify your goals and create a roadmap for success.",
  },
  {
    text: "Lacking Motivation? Get inspired and stay motivated with creative visualization and goal-setting strategies.",
  },
  {
    text: "Struggling with Self-Confidence? Boost your self-esteem and believe in your potential.",
  },
  {
    text: "Want to Meet New Friends? Join a supportive community of like-minded teens who share your aspirations.",
  },
  {
    text: "Need Direction? Discover your strengths and passions to guide your future choices.",
  },
];

export const ServicesOverviewSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-[#fdf9f3] py-12 px-4">
      <div className="max-w-[1512px] mx-auto">
        <Separator className="mb-12 bg-[#152734]" />

        <div className="flex flex-col items-center mb-12">
          <h2 className="[font-family:'Amiri',Helvetica] font-normal text-[#152734] text-[55px] text-center tracking-[2.75px] leading-normal mb-6">
            SERVICES
          </h2>

          <h3 className="[font-family:'Amiri',Helvetica] font-normal italic text-[#152734] text-[32px] text-center tracking-[0] leading-normal">
            Why Join?
          </h3>
        </div>

        <div className="flex flex-col gap-10 max-w-[1324px] mx-auto px-4">
          {servicesData.map((service, index) => (
            <p
              key={index}
              className="[font-family:'Gayathri',Helvetica] font-bold text-[#152734] text-2xl tracking-[0.29px] leading-[50px]"
            >
              {service.text}
            </p>
          ))}
        </div>

        <Separator className="mt-12 bg-[#152734]" />
      </div>
    </section>
  );
};
