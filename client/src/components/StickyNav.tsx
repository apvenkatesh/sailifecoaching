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

const NAV_HEIGHT = 130;

export const StickyNav = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

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
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-[130px] px-8">
        {/* Logo + Brand */}
        <a
          href="#home"
          onClick={(e) => handleClick(e, "#home")}
          className="flex items-center gap-4"
        >
          <img
            src="/figmaAssets/frame-1.png"
            alt="Sai Life Coaching"
            className="h-[120px] w-auto object-contain"
          />
          <span
            className="text-[#3d2414] text-[2.4rem] font-bold tracking-wide hidden sm:block"
            style={{ fontFamily: "'Amiri', Helvetica" }}
          >
            Sai Life Coaching
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                style={{ fontFamily: "'Raleway', sans-serif" }}
                className={`text-sm font-bold tracking-widest uppercase transition-colors duration-200 ${
                  isActive
                    ? "text-[#c8953d]"
                    : "text-[#3d2414] hover:text-[#c8953d]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-[#3d2414]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-8 pb-6 flex flex-col gap-5">
          {navigationItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              style={{ fontFamily: "'Raleway', sans-serif" }}
              className={`text-sm font-bold tracking-widest uppercase ${
                activeSection === item.id
                  ? "text-[#c8953d]"
                  : "text-[#3d2414]"
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
