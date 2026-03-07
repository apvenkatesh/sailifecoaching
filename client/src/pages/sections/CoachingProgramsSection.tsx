import { Separator } from "@/components/ui/separator";

const coachingPrograms = [
  {
    title: "Individual Coaching",
    subtitle: "Personalized Guidance",
    description:
      "Individual coaching sessions provide personalized guidance and support to help clients navigate challenges, set meaningful goals, and achieve personal growth. I work collaboratively with individuals to develop strategies for success and empower them to lead fulfilling lives.",
  },
  {
    title: "Group Workshops",
    subtitle: "Community Learning",
    description:
      "Join group workshops to engage in community learning and personalized development. These interactive sessions foster collaboration, growth, and shared experiences, creating a supportive environment for self-discovery and skill enhancement.",
  },
];

export const CoachingProgramsSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-14">
      <div className="bg-[#fdf9f3] py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {coachingPrograms.map((program, index) => (
              <div key={index} className="flex flex-col items-center">
                <h2 className="[font-family:'Amiri',Helvetica] font-bold text-[#152734] text-4xl text-center tracking-[0] leading-normal mb-8">
                  {program.title}
                </h2>
                <h3 className="text-[#152734] text-[22px] tracking-[0.44px] leading-normal [font-family:'Gayathri',Helvetica] font-bold mb-8 text-center">
                  {program.subtitle}
                </h3>
                <p className="text-[#152734] text-2xl tracking-[0.48px] leading-[45px] [font-family:'Gayathri',Helvetica] font-bold text-center max-w-[556px]">
                  {program.description}
                </p>
              </div>
            ))}
            <Separator
              orientation="vertical"
              className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-[#152734] hidden md:block"
            />
          </div>
        </div>
      </div>
      <Separator className="w-full h-[2px] bg-[#152734]" />
    </section>
  );
};
