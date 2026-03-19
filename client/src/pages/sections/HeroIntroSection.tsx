import { ChevronDownIcon } from "lucide-react";

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "Welcome", href: "#welcome" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const HeroIntroSection = (): JSX.Element => {
  return (
    <section className="relative w-full" id="home">
      <nav className="w-full h-[173px] bg-[#fdf9f3] flex items-center justify-end px-12 gap-10">
        {navigationItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="[font-family:'Gayathri',Helvetica] font-bold text-[#2f422e] text-xl tracking-[0.40px] hover:text-[#2f422e]/70 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex w-full min-h-[769px]" id="welcome">
        <div className="w-1/2 bg-[#fdf9f3] flex items-center justify-center p-8">
          <img
            src="/figmaAssets/rectangle-24.png"
            alt="Coach Shanmuga Priya"
            className="w-full max-h-[628px] object-cover"
          />
        </div>

        <div className="w-1/2 bg-[#2c2721] flex flex-col items-center justify-center gap-8 p-12">
          <h1 className="[font-family:'Amiri',Helvetica] font-normal text-[#fff9e4] text-[55px] text-center tracking-[2.75px] leading-normal">
            DISCOVER YOURSELF
          </h1>

          <h2 className="[font-family:'Amiri',Helvetica] font-normal text-[#fff9e4] text-[32px] text-center tracking-[0] leading-normal">
            Unlock Your Full Potential
          </h2>

          <div className="flex flex-col items-center gap-4 mt-12">
            <a
              href="#services"
              className="[font-family:'Gayathri',Helvetica] font-bold text-[#fff9e4] text-xl tracking-[0] leading-[27px] hover:text-[#fff9e4]/70 transition-colors"
            >
              Start Your Journey
            </a>
            <ChevronDownIcon className="w-[30px] h-[30px] text-[#fdf9f3] border border-solid border-[#fdf9f3] rounded" />
          </div>
        </div>
      </div>
    </section>
  );
};
