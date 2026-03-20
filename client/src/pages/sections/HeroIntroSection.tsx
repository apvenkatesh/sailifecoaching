interface Props {
  onOpenBooking: () => void;
}

export const HeroIntroSection = ({ onOpenBooking }: Props): JSX.Element => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden flex flex-col justify-end" style={{ minHeight: "600px" }}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/figmaAssets/hero-bg.png)" }}
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-8 pt-0 pb-12 flex flex-col items-center text-center">
        <p
          className="text-white text-xs tracking-[0.4em] uppercase font-bold mb-6 drop-shadow"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Life Coaching with Shanmuga Priya
        </p>

        <h1
          className="text-white text-[58px] md:text-[72px] font-bold leading-[1.1] tracking-tight mb-6 drop-shadow-lg"
          style={{ fontFamily: "'Raleway', sans-serif" }}
        >
          Discover Yourself
        </h1>

        <p
          className="text-white/90 text-[1.6rem] font-light tracking-wide mb-10 drop-shadow"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Unlock Your Full Potential
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollTo("programs")}
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
