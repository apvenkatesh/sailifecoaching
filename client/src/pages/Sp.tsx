import { StickyNav } from "@/components/StickyNav";
import { HeroIntroSection } from "./sections/HeroIntroSection";
import { ServicesOverviewSection } from "./sections/ServicesOverviewSection";
import { CoachingProgramsSection } from "./sections/CoachingProgramsSection";
import { ClientTestimonialsSection } from "./sections/ClientTestimonialsSection";
import { ContactInfoSection } from "./sections/ContactInfoSection";

export const Sp = (): JSX.Element => {
  const handleScroll = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white w-full">
      <StickyNav />

      <div className="pt-[72px]">
        <section id="home">
          <HeroIntroSection />
        </section>

        <section id="about" className="w-full bg-[#fdf9f3] py-24 px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#bb9774] pointer-events-none" />
              <img
                src="/figmaAssets/ellipse-1.png"
                alt="Coach Shanmuga Priya"
                className="w-full max-w-[500px] object-cover relative z-10"
              />
            </div>

            <div className="flex flex-col gap-6">
              <p
                className="text-[#bb9774] text-sm tracking-[0.3em] uppercase font-bold"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                About Me
              </p>
              <h2
                className="text-[#1c2b1c] text-[42px] leading-tight tracking-wide"
                style={{ fontFamily: "'Amiri', Helvetica" }}
              >
                About Me + My Coaching
              </h2>
              <div
                className="w-12 h-0.5 bg-[#bb9774]"
              />
              <p
                className="text-[#555] text-base leading-relaxed"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                I am Coach Shanmuga Priya (SP), a certified Life Coach through
                Mindvalley, dedicated to guiding individuals on a journey toward
                life satisfaction through the principles of gratitude, empathy,
                and forgiveness.
              </p>
              <p
                className="text-[#555] text-base leading-relaxed"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                I work with a range of clients, from teens to adults, helping
                them to enhance their quality of life. My coaching approach is
                focused on self-development, offering tools and strategies to
                gain insight, re-frame perspectives, practice self-forgiveness,
                manage relationships, boost creativity, improve work
                performance, and effectively manage stress.
              </p>
              <button
                onClick={() => handleScroll("#contact")}
                className="self-start mt-4 px-10 py-4 bg-[#1c2b1c] text-white text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#bb9774] transition-colors duration-200"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                Work With Me
              </button>
            </div>
          </div>
        </section>

        <section id="services">
          <ServicesOverviewSection />
        </section>

        <div className="w-full bg-[#bb9774] py-16 px-6">
          <div className="max-w-[900px] mx-auto text-center flex flex-col items-center gap-6">
            <h2
              className="text-white text-[40px] leading-tight tracking-wide"
              style={{ fontFamily: "'Amiri', Helvetica" }}
            >
              Ready to Transform Your Life?
            </h2>
            <p
              className="text-white/85 text-base leading-relaxed max-w-xl"
              style={{ fontFamily: "'Gayathri', Helvetica" }}
            >
              Let me handle every detail of your journey, from first
              conversation to lasting change.
            </p>
            <button
              onClick={() => handleScroll("#contact")}
              className="px-10 py-4 bg-white text-[#1c2b1c] text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#fdf9f3] transition-colors duration-200"
              style={{ fontFamily: "'Gayathri', Helvetica" }}
            >
              Get Started Today
            </button>
          </div>
        </div>

        <section id="programs">
          <CoachingProgramsSection />
        </section>

        <section id="testimonials">
          <ClientTestimonialsSection />
        </section>

        <div className="relative w-full h-[320px] overflow-hidden">
          <img
            src="/figmaAssets/pictures.png"
            alt="Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1c2b1c]/40" />
        </div>

        <section id="contact">
          <ContactInfoSection />
        </section>

        <footer className="w-full bg-[#111d11] py-10 px-8">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <img
              src="/figmaAssets/frame-1.png"
              alt="Sai Life Coaching"
              className="h-[48px] w-auto object-contain brightness-0 invert opacity-80"
            />
            <p
              className="text-white/40 text-sm text-center"
              style={{ fontFamily: "'Gayathri', Helvetica" }}
            >
              © {new Date().getFullYear()} Sai Life Coaching · Coach Shanmuga Priya Puliyadi · MindValley Certified
            </p>
            <div className="flex gap-6">
              <a href="tel:9259229980" className="text-white/40 hover:text-[#bb9774] transition-colors">
                <img src="/figmaAssets/phone.png" alt="Phone" className="w-5 h-5 brightness-0 invert opacity-60 hover:opacity-100" />
              </a>
              <a href="mailto:saishree99@gmail.com" className="text-white/40 hover:text-[#bb9774] transition-colors">
                <img src="/figmaAssets/letter.png" alt="Email" className="w-5 h-5 brightness-0 invert opacity-60 hover:opacity-100" />
              </a>
              <a href="https://instagram.com/sp.lifecoach" target="_blank" rel="noopener noreferrer">
                <img src="/figmaAssets/instagram.png" alt="Instagram" className="w-5 h-5 brightness-0 invert opacity-60 hover:opacity-100" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
