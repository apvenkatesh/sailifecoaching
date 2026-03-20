import { useState } from "react";
import { StickyNav } from "@/components/StickyNav";
import { BookingModal } from "@/components/BookingModal";
import { WorkshopModal } from "@/components/WorkshopModal";
import { HeroIntroSection } from "./sections/HeroIntroSection";
import { ServicesOverviewSection } from "./sections/ServicesOverviewSection";
import { CoachingProgramsSection } from "./sections/CoachingProgramsSection";
import { ClientTestimonialsSection } from "./sections/ClientTestimonialsSection";
import { ContactInfoSection } from "./sections/ContactInfoSection";

export const Sp = (): JSX.Element => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [workshopOpen, setWorkshopOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white w-full">
      <StickyNav />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
      <WorkshopModal isOpen={workshopOpen} onClose={() => setWorkshopOpen(false)} />

      <div className="pt-[130px]">
        <section id="home">
          <HeroIntroSection onOpenBooking={() => setBookingOpen(true)} />
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
                onClick={() => setBookingOpen(true)}
                className="self-start mt-2 px-10 py-4 bg-[#1b2a3b] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#c8953d] transition-colors duration-200"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Book a Session
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
              onClick={() => setBookingOpen(true)}
              className="px-10 py-4 bg-white text-[#1b2a3b] text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#f5f4f0] transition-colors duration-200"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Book a Session
            </button>
          </div>
        </div>

        {/* Programs */}
        <section id="programs">
          <CoachingProgramsSection onOpenBooking={() => setBookingOpen(true)} onOpenWorkshop={() => setWorkshopOpen(true)} />
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
            <div className="flex gap-5 items-center">
              <a href="tel:9253671585">
                <img src="/figmaAssets/phone.png" alt="Phone" className="w-5 h-5 brightness-0 invert opacity-40 hover:opacity-80 transition-opacity" />
              </a>
              <a href="mailto:meetcoachsp@gmail.com">
                <img src="/figmaAssets/letter.png" alt="Email" className="w-5 h-5 brightness-0 invert opacity-40 hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://instagram.com/sailifecoaching" target="_blank" rel="noopener noreferrer">
                <img src="/figmaAssets/instagram.png" alt="Instagram" className="w-5 h-5 brightness-0 invert opacity-40 hover:opacity-80 transition-opacity" />
              </a>
              <a href="https://wa.me/message/BV664S3RLOH3F1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white opacity-40 hover:opacity-80 transition-opacity">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
