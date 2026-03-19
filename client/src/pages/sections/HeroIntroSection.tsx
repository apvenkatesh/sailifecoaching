export const HeroIntroSection = (): JSX.Element => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/figmaAssets/rectangle-24.png)" }}
      />
      <div className="absolute inset-0 bg-[#1b2a3b]/78" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        <p
          className="text-[#c8953d] text-xs tracking-[0.4em] uppercase mb-6 font-bold"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Certified Life Coach · MindValley
        </p>

        <h1
          className="text-white text-[68px] md:text-[84px] font-bold leading-[1.1] tracking-tight mb-5"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Discover Yourself
        </h1>

        <p
          className="text-white/80 text-2xl font-light tracking-wide mb-14"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Unlock Your Full Potential
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo("contact")}
            className="px-10 py-4 bg-[#c8953d] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#b07e2c] transition-colors duration-200"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Start Your Journey
          </button>
          <button
            onClick={() => scrollTo("services")}
            className="px-10 py-4 border border-white/50 text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-white/10 transition-colors duration-200"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Our Services
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <div className="w-px h-14 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
};
