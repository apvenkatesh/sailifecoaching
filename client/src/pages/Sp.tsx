import { Separator } from "@/components/ui/separator";
import { ClientTestimonialsSection } from "./sections/ClientTestimonialsSection";
import { CoachingProgramsSection } from "./sections/CoachingProgramsSection";
import { ContactInfoSection } from "./sections/ContactInfoSection";
import { HeroIntroSection } from "./sections/HeroIntroSection";
import { ServicesOverviewSection } from "./sections/ServicesOverviewSection";

export const Sp = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-w-[1512px] relative">
      <div className="w-[177px] h-[147px] absolute top-3 left-[50px] z-10 [background:url(../figmaAssets/frame-1.png)_50%_50%_/_cover]" />

      <Separator className="absolute top-[174px] left-0 w-full h-0.5 bg-[#000000]" />

      <HeroIntroSection />

      <section className="relative w-full bg-[#2d2d2d] py-20">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-[#000000]" />

        <div className="container mx-auto px-[36px] max-w-[1512px]">
          <div className="flex flex-col items-center gap-12">
            <h2 className="[font-family:'Amiri',Helvetica] font-normal text-[#fff9e4] text-[55px] text-center tracking-[2.75px] leading-normal">
              ABOUT ME + MY COACHING
            </h2>

            <div className="flex items-start gap-12 w-full justify-between px-[139px]">
              <div className="flex-1 max-w-[840px]">
                <p className="[font-family:'Gayathri',Helvetica] font-bold text-[#fff9e4] text-2xl tracking-[0] leading-[45px]">
                  I am Coach Shanmuga Priya (SP), a certified Life Coach through
                  Mindvalley, dedicated to guiding individuals on a journey
                  toward life satisfaction through the principles of gratitude,
                  empathy, and forgiveness. I work with a range of clients, from
                  teens to adults, helping them to enhance their quality of
                  life. My coaching approach is focused on self-development,
                  offering tools and strategies to gain insight, re-frame
                  perspectives, practice self-forgiveness, manage relationships,
                  boost creativity, improve work performance, and effectively
                  manage stress.
                </p>
              </div>

              <div className="flex-shrink-0">
                <img
                  className="w-[350px] h-[350px] object-cover rounded-full"
                  alt="Coach Profile"
                  src="/figmaAssets/ellipse-1.png"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#000000]" />
      </section>

      <img
        className="absolute top-[243px] left-[174px] w-[488px] h-[628px] border-[7px] border-solid border-[#fdf9f3] object-cover z-10"
        alt="Coach Image"
        src="/figmaAssets/rectangle-24.png"
      />

      <Separator className="w-full h-[3px] bg-[#000000]" />

      <ServicesOverviewSection />

      <Separator className="w-full h-[3px] bg-[#000000]" />

      <CoachingProgramsSection />

      <ClientTestimonialsSection />

      <Separator className="w-full h-0.5 bg-[#000000]" />

      <section className="relative w-full">
        <img
          className="w-full h-[422px] object-cover"
          alt="Gallery Pictures"
          src="/figmaAssets/pictures.png"
        />
      </section>

      <ContactInfoSection />

      <footer className="relative w-full py-12 px-[104px]">
        <div className="flex flex-col gap-12">
          <div className="flex items-center gap-4">
            <img
              className="w-[30px] h-[30px]"
              alt="Phone"
              src="/figmaAssets/phone.png"
            />
          </div>

          <div className="flex items-center gap-4">
            <img
              className="w-[30px] h-[30px]"
              alt="Email"
              src="/figmaAssets/letter.png"
            />
          </div>

          <div className="flex items-center gap-4">
            <img
              className="w-[30px] h-[30px]"
              alt="Instagram"
              src="/figmaAssets/instagram.png"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};
