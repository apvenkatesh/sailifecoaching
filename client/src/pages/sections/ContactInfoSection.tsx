import { Separator } from "@/components/ui/separator";

export const ContactInfoSection = (): JSX.Element => {
  const contactInfo = {
    title: "Sai Life Coaching",
    leftColumn: {
      phone: "(925)-922-9980",
      email: "saishree99@gmail.com",
      social: "@sp.lifecoach",
    },
    rightColumn: {
      name: "Coach Shanmuga Priya Puliyadi",
      certification: "MindValley ©",
    },
  };

  return (
    <section className="relative w-full bg-[#fdf9f3] py-8">
      <div className="container mx-auto px-4">
        <Separator className="mb-8" />

        <header className="text-center mb-8">
          <h2 className="[font-family:'Amiri',Helvetica] font-bold text-[#565a6a] text-2xl">
            {contactInfo.title}
          </h2>
        </header>

        <Separator className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col justify-center items-center md:items-start space-y-4">
            <address className="not-italic [font-family:'Gayathri',Helvetica] font-bold text-[#152734] text-2xl leading-[50px] text-center md:text-left">
              {contactInfo.leftColumn.phone}
              <br />
              {contactInfo.leftColumn.email}
              <br />
              {contactInfo.leftColumn.social}
            </address>
          </div>

          <Separator
            orientation="vertical"
            className="hidden md:block h-auto"
          />

          <div className="flex flex-col justify-center items-center md:items-start">
            <div className="[font-family:'Gayathri',Helvetica] font-bold text-[#152734] text-2xl leading-[50px] text-center md:text-left">
              {contactInfo.rightColumn.name}
              <br />
              {contactInfo.rightColumn.certification}
            </div>
          </div>
        </div>

        <Separator className="mt-12" />
      </div>
    </section>
  );
};
