export const HeroIntroSection = (): JSX.Element => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#f5f4f0]" style={{ minHeight: "600px" }}>

      {/* Circle image — absolutely positioned right side, bleeds vertically */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] md:w-[620px] md:h-[620px] rounded-full overflow-hidden translate-x-[15%]"
      >
        <img
          src="/figmaAssets/rectangle-24.png"
          alt="Coach Shanmuga Priya"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Text — overlaps the image */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 py-20 flex flex-col items-start text-left">
        <p
          className="text-[#c8953d] text-xs tracking-[0.4em] uppercase font-bold mb-6"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Life Coaching with Shanmuga Priya
        </p>

        <h1
          className="text-[#c8953d] text-[58px] md:text-[72px] font-bold leading-[1.1] tracking-tight mb-6 max-w-[600px]"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Discover Yourself
        </h1>

        <p
          className="text-[#1b2a3b] text-[1.6rem] font-light tracking-wide mb-10 max-w-[500px]"
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
            className="px-10 py-4 bg-[#1b2a3b] text-white text-xs font-bold tracking-[0.25em] uppercase hover:bg-[#c8953d] transition-colors duration-200"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Our Services
          </button>
        </div>
      </div>

    </section>
  );
};
