export const HeroIntroSection = (): JSX.Element => {
  const handleScroll = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/figmaAssets/rectangle-24.png)" }}
      />
      <div className="absolute inset-0 bg-[#1c2b1c]/75" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <p
          className="text-[#bb9774] text-sm tracking-[0.3em] uppercase mb-6 font-bold"
          style={{ fontFamily: "'Gayathri', Helvetica" }}
        >
          Certified Life Coach · MindValley
        </p>

        <h1
          className="text-white text-[64px] md:text-[80px] leading-[1.1] tracking-[0.05em] mb-6"
          style={{ fontFamily: "'Amiri', Helvetica" }}
        >
          Discover Yourself
        </h1>

        <p
          className="text-white/80 text-2xl tracking-wide mb-12"
          style={{ fontFamily: "'Amiri', Helvetica" }}
        >
          Unlock Your Full Potential
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => handleScroll("#contact")}
            className="px-10 py-4 bg-[#bb9774] text-white text-sm font-bold tracking-[0.2em] uppercase hover:bg-[#a8845f] transition-colors duration-200"
            style={{ fontFamily: "'Gayathri', Helvetica" }}
          >
            Start Your Journey
          </button>
          <button
            onClick={() => handleScroll("#services")}
            className="px-10 py-4 border border-white/60 text-white text-sm font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-colors duration-200"
            style={{ fontFamily: "'Gayathri', Helvetica" }}
          >
            Our Services
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-12 bg-white/40" />
      </div>
    </section>
  );
};
