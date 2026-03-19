export const ContactInfoSection = (): JSX.Element => {
  return (
    <section className="w-full bg-[#1c2b1c] py-24 px-6">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <p
            className="text-[#bb9774] text-sm tracking-[0.3em] uppercase font-bold mb-4"
            style={{ fontFamily: "'Gayathri', Helvetica" }}
          >
            Get in Touch
          </p>
          <h2
            className="text-white text-[48px] leading-tight tracking-wide mb-8"
            style={{ fontFamily: "'Amiri', Helvetica" }}
          >
            Contact
          </h2>
          <p
            className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: "'Gayathri', Helvetica" }}
          >
            Hello, I'm Coach Shanmuga Priya (SP). I've been helping individuals
            discover themselves and live more fulfilling lives, and I'd love to
            help you take that next step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <a
            href="tel:9259229980"
            className="flex flex-col items-center gap-4 p-8 border border-white/20 hover:border-[#bb9774]/60 transition-colors duration-300 group"
          >
            <img
              src="/figmaAssets/phone.png"
              alt="Phone"
              className="w-8 h-8 brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <div className="text-center">
              <p
                className="text-[#bb9774] text-xs tracking-[0.3em] uppercase font-bold mb-2"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                Phone
              </p>
              <p
                className="text-white text-base font-bold"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                (925)-922-9980
              </p>
            </div>
          </a>

          <a
            href="mailto:saishree99@gmail.com"
            className="flex flex-col items-center gap-4 p-8 border border-white/20 hover:border-[#bb9774]/60 transition-colors duration-300 group"
          >
            <img
              src="/figmaAssets/letter.png"
              alt="Email"
              className="w-8 h-8 brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <div className="text-center">
              <p
                className="text-[#bb9774] text-xs tracking-[0.3em] uppercase font-bold mb-2"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                Email
              </p>
              <p
                className="text-white text-base font-bold"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                saishree99@gmail.com
              </p>
            </div>
          </a>

          <a
            href="https://instagram.com/sp.lifecoach"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 p-8 border border-white/20 hover:border-[#bb9774]/60 transition-colors duration-300 group"
          >
            <img
              src="/figmaAssets/instagram.png"
              alt="Instagram"
              className="w-8 h-8 brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <div className="text-center">
              <p
                className="text-[#bb9774] text-xs tracking-[0.3em] uppercase font-bold mb-2"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
              >
                Instagram
              </p>
              <p
                className="text-white text-base font-bold"
                style={{ fontFamily: "'Gayathri', Helvetica" }}
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
