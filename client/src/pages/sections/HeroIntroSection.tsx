export const HeroIntroSection = (): JSX.Element => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[#1b2a3b]" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 py-24 flex flex-col md:flex-row items-center gap-16">

        {/* Left — text + buttons */}
        <div className="flex-1 flex flex-col items-start text-left">
          <p
            className="text-[#c8953d] text-xs tracking-[0.4em] uppercase font-bold mb-6"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Life Coaching with Shanmuga Priya
          </p>

          <h1
            className="text-[#c8953d] text-[58px] md:text-[72px] font-bold leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "'Raleway', sans-serif", WebkitTextStroke: "1.5px black" }}
          >
            Discover Yourself
          </h1>

          <p
            className="text-white/90 text-[1.6rem] font-light tracking-wide mb-10"
            style={{ fontFamily: "'Open Sans', sans-serif", WebkitTextStroke: "1px black" }}
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
              className="px-10 py-4 bg-[#1b2a3b] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#c8953d] transition-colors duration-200"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Our Services
            </button>
          </div>
        </div>

        {/* Right — circular image */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="relative">
            {/* Outer gold ring */}
            <div className="w-[340px] h-[340px] md:w-[420px] md:h-[420px] rounded-full border-4 border-[#c8953d] p-1">
              <img
                src="/figmaAssets/rectangle-24.png"
                alt="Coach Shanmuga Priya"
                className="w-full h-full rounded-full object-cover object-top"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <div className="w-px h-14 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
};
