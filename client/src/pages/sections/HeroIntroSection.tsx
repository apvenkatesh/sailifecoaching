import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { label: "Home", href: "#home" },
  { label: "Welcome", href: "#welcome" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const HeroIntroSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <nav className="w-full h-[173px] bg-[#fdf9f3] border border-solid flex items-center justify-between px-8">
        <div className="flex items-center">
          <img src="/figmaAssets/logo.png" alt="Logo" className="h-12" />
        </div>

        <div className="flex gap-8">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-0 [font-family:'Gayathri',Helvetica] font-bold text-[#2f422e] text-xl tracking-[0.40px] hover:bg-transparent hover:text-[#2f422e]/80"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      <div className="flex w-full h-[769px]">
        <div className="w-1/2 bg-[#fdf9f3] border border-solid flex items-center justify-center p-8">
          <img
            src="/figmaAssets/hero-image.jpg"
            alt="Person meditating by the ocean"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="w-1/2 bg-[#2c2721] border border-solid border-[#fdf9f3] flex flex-col items-center justify-center gap-8 p-8">
          <h1 className="[-webkit-text-stroke:1px_#fdf9f3] [font-family:'Amiri',Helvetica] font-normal text-[#fff9e4] text-[55px] text-center tracking-[2.75px] leading-normal">
            DISCOVER YOURSELF
          </h1>

          <h2 className="[-webkit-text-stroke:1px_#fdf9f3] [font-family:'Amiri',Helvetica] font-normal text-[#fff9e4] text-[32px] text-center tracking-[0] leading-normal">
            Unlock Your Full Potential
          </h2>

          <div className="flex flex-col items-center gap-4 mt-16">
            <Button
              variant="ghost"
              className="h-auto p-0 [-webkit-text-stroke:1px_#fdf9f3] [font-family:'Gayathri',Helvetica] font-bold text-white text-xl tracking-[0] leading-[27px] hover:bg-transparent hover:text-white/80"
            >
              Start Your Journey
            </Button>

            <ChevronDownIcon className="w-[30px] h-[30px] text-[#fdf9f3] border border-solid border-[#fdf9f3] rounded" />
          </div>
        </div>
      </div>
    </section>
  );
};
