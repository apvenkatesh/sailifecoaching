import { useEffect, useState } from "react";

const navigationItems = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Welcome", href: "#welcome", id: "welcome" },
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const StickyNav = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = navigationItems.map((item) => item.id);

    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      });

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#fdf9f3] border-b border-black">
      <div className="flex items-center justify-between h-[80px] px-8">
        <div className="w-[120px] h-[60px] flex-shrink-0">
          <img
            src="/figmaAssets/frame-1.png"
            alt="Sai Life Coaching Logo"
            className="h-full w-full object-contain object-left"
          />
        </div>

        <nav className="flex items-center gap-10">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={[
                  "font-bold text-xl tracking-[0.40px] transition-colors duration-200",
                  "font-['Gayathri',Helvetica]",
                  isActive
                    ? "text-[#2f422e] border-b-2 border-[#2f422e] pb-0.5"
                    : "text-[#2f422e]/60 hover:text-[#2f422e]",
                ].join(" ")}
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
