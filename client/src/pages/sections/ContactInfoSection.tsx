export const ContactInfoSection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#1b2a3b] py-24 px-6">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-[#c8953d] text-xs tracking-[0.4em] uppercase font-bold mb-4"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Get in Touch
          </p>
          <h2
            className="text-white text-[44px] font-bold leading-tight tracking-tight mb-6"
            style={{ fontFamily: "'Raleway', sans-serif" }}
          >
            Contact
          </h2>
          <p
            className="text-white/65 text-base leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Hello, I'm Coach Shanmuga Priya (SP). I've been helping individuals
            discover themselves and live more fulfilling lives, and I'd love to
            help you take that next step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <a
            href="tel:9259229980"
            className="flex flex-col items-center gap-4 p-8 border border-white/20 hover:border-[#c8953d]/70 transition-colors duration-300 group"
          >
            <img
              src="/figmaAssets/phone.png"
              alt="Phone"
              className="w-8 h-8 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
            />
            <div className="text-center">
              <p
                className="text-[#c8953d] text-xs tracking-[0.3em] uppercase font-bold mb-2"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Phone
              </p>
              <p
                className="text-white text-sm font-bold"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                (925)-922-9980
              </p>
            </div>
          </a>

          <a
            href="mailto:saishree99@gmail.com"
            className="flex flex-col items-center gap-4 p-8 border border-white/20 hover:border-[#c8953d]/70 transition-colors duration-300 group"
          >
            <img
              src="/figmaAssets/letter.png"
              alt="Email"
              className="w-8 h-8 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
            />
            <div className="text-center">
              <p
                className="text-[#c8953d] text-xs tracking-[0.3em] uppercase font-bold mb-2"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Email
              </p>
              <p
                className="text-white text-sm font-bold"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                saishree99@gmail.com
              </p>
            </div>
          </a>

          <a
            href="https://instagram.com/sp.lifecoach"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 p-8 border border-white/20 hover:border-[#c8953d]/70 transition-colors duration-300 group"
          >
            <img
              src="/figmaAssets/instagram.png"
              alt="Instagram"
              className="w-8 h-8 brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
            />
            <div className="text-center">
              <p
                className="text-[#c8953d] text-xs tracking-[0.3em] uppercase font-bold mb-2"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Instagram
              </p>
              <p
                className="text-white text-sm font-bold"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                @sp.lifecoach
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
