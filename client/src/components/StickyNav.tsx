import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navigationItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Programs", href: "#programs", id: "programs" },
  { label: "Testimonials", href: "#testimonials", id: "testimonials" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const StickyNav = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navigationItems.map((item) => item.id);
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#1c2b1c] shadow-lg" : "bg-[#1c2b1c]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[72px] px-8">
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="flex items-center gap-3"
        >
          <img
            src="/figmaAssets/frame-1.png"
            alt="Sai Life Coaching"
            className="h-[52px] w-auto object-contain brightness-0 invert"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                style={{ fontFamily: "'Gayathri', Helvetica" }}
                className={`text-base font-bold tracking-widest uppercase transition-colors duration-200 ${
                  isActive
                    ? "text-[#bb9774]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#1c2b1c] border-t border-white/10 px-8 pb-6 flex flex-col gap-4">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              style={{ fontFamily: "'Gayathri', Helvetica" }}
              className={`text-base font-bold tracking-widest uppercase ${
                activeSection === item.id ? "text-[#bb9774]" : "text-white/80"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
