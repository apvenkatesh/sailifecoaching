import { StickyNav } from "@/components/StickyNav";
import { HeroIntroSection } from "./sections/HeroIntroSection";
import { ServicesOverviewSection } from "./sections/ServicesOverviewSection";
import { CoachingProgramsSection } from "./sections/CoachingProgramsSection";
import { ClientTestimonialsSection } from "./sections/ClientTestimonialsSection";
import { ContactInfoSection } from "./sections/ContactInfoSection";

export const Sp = (): JSX.Element => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white w-full">
      <StickyNav />

      <div className="pt-[80px]">
        <section id="home">
          <HeroIntroSection />
        </section>

        {/* About */}
        <section id="about" className="w-full bg-white py-24 px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-[380px] h-[380px] rounded-full overflow-hidden border-4 border-[#c8953d] shadow-2xl">
                  <img
                    src="/figmaAssets/ellipse-1.png"
                    alt="Coach Shanmuga Priya"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#c8953d] rounded-full flex items-center justify-center">
                  <span
                    className="text-white text-xs font-bold tracking-wider text-center leading-tight px-2"
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                  >
                    CERTIFIED<br />COACH
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <p
                className="text-[#c8953d] text-xs tracking-[0.4em] uppercase font-bold"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                About Me
              </p>
              <h2
                className="text-[#1b2a3b] text-[40px] font-bold leading-tight tracking-tight"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                About Me + My Coaching
              </h2>
              <div className="w-12 h-1 bg-[#c8953d]" />
              <p
                className="text-[#555] text-sm leading-relaxed"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                I am Coach Shanmuga Priya (SP), a certified Life Coach through
                Mindvalley, dedicated to guiding individuals on a journey toward
                life satisfaction through the principles of gratitude, empathy,
                and forgiveness.
              </p>
              <p
                className="text-[#555] text-sm leading-relaxed"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                I work with a range of clients, from teens to adults, helping
                them to enhance their quality of life. My coaching approach is
                focused on self-development, offering tools and strategies to
                gain insight, re-frame perspectives, practice self-forgiveness,
                manage relationships, boost creativity, improve work
                performance, and effectively manage stress.
              </p>
              <button
                onClick={() => scrollTo("contact")}
                className="self-start mt-2 px-10 py-4 bg-[#1b2a3b] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#c8953d] transition-colors duration-200"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Work With Me
              </button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services">
          <ServicesOverviewSection />
        </section>

        {/* Mid-page CTA */}
        <div className="w-full bg-[#c8953d] py-16 px-6">
          <div className="max-w-[900px] mx-auto text-center flex flex-col items-center gap-6">
            <h2
              className="text-white text-[38px] font-bold leading-tight tracking-tight"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Ready to Transform Your Life?
            </h2>
            <p
              className="text-white/85 text-sm leading-relaxed max-w-xl"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Let me guide every step of your journey — from first conversation
              to lasting change.
            </p>
            <button
              onClick={() => scrollTo("contact")}
              className="px-10 py-4 bg-white text-[#1b2a3b] text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#f5f4f0] transition-colors duration-200"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Get Started Today
            </button>
          </div>
        </div>

        {/* Programs */}
        <section id="programs">
          <CoachingProgramsSection />
        </section>

        {/* Testimonials */}
        <section id="testimonials">
          <ClientTestimonialsSection />
        </section>

        {/* Gallery strip */}
        <div className="relative w-full h-[300px] overflow-hidden">
          <img
            src="/figmaAssets/pictures.png"
            alt="Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1b2a3b]/40" />
        </div>

        {/* Contact */}
        <section id="contact">
          <ContactInfoSection />
        </section>

        {/* Footer */}
        <footer className="w-full bg-[#111d2b] py-10 px-8">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/figmaAssets/frame-1.png"
                alt="Sai Life Coaching"
                className="h-[44px] w-auto object-contain brightness-0 invert opacity-70"
              />
              <span
                className="text-white/60 text-base font-bold"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Sai Life Coaching
              </span>
            </div>
            <p
              className="text-white/35 text-xs text-center"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              © {new Date().getFullYear()} Sai Life Coaching · Coach Shanmuga Priya Puliyadi · MindValley Certified
            </p>
            <div className="flex gap-5">
              <a href="tel:9259229980">
                <img src="/figmaAssets/phone.png" alt="Phone" className="w-5 h-5 brightness-0 invert opacity-40 hover:opacity-80 transition-opacity" />
              </a>
              <a href="mailto:saishree99@gmail.com">
                <img src="/figmaAssets/letter.png" alt="Email" className="w-5 h-5 brightness-0 invert opacity-40 hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://instagram.com/sp.lifecoach" target="_blank" rel="noopener noreferrer">
                <img src="/figmaAssets/instagram.png" alt="Instagram" className="w-5 h-5 brightness-0 invert opacity-40 hover:opacity-80 transition-opacity" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
