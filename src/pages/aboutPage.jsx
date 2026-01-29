import Header from "../components/header";

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--color-primary),_#ffffff_65%)] text-[color:var(--color-secondary)] font-sans">
      <Header />

      {/* ABOUT HEADER */}
      <div className="text-center py-28 px-6 relative">
        <div className="absolute inset-0 -z-10 bg-[color:var(--color-accent)]/20 blur-[140px]" />
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          About{" "}
          <span className="text-[color:var(--color-accent)]">
            Crystal Beauty Clear
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-[1.8] tracking-wide">
          Discover the story, passion, and purpose behind
          <span className="font-semibold text-[color:var(--color-accent)]">
            {" "}
            CBC Cosmetics
          </span>{" "}
          — your trusted brand for luxury skincare and beauty.
        </p>
      </div>

      {/* MISSION SECTION */}
      <div className="max-w-6xl mx-auto px-8 md:px-20 py-20">
        <div className="bg-white/50 backdrop-blur-2xl p-12 md:p-16 rounded-[3rem]
        shadow-[0_30px_80px_rgba(0,0,0,0.18)]
        border border-white/60">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Our{" "}
            <span className="text-[color:var(--color-accent)]">Mission</span>
          </h2>
          <p className="text-gray-700 text-lg leading-[1.9] text-center max-w-4xl mx-auto">
            Our mission at Crystal Beauty Clear is simple — to empower every
            person with confidence that comes from healthy, glowing skin. We
            blend nature-inspired botanicals with advanced skincare science to
            deliver visible, lasting results.
          </p>
        </div>
      </div>

      {/* STORY SECTION */}
      <div className="max-w-6xl mx-auto px-8 md:px-20 py-10 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="flex justify-center">
          <img
            src="/cbcmodel.jpg"
            alt="CBC Story"
            className="w-[350px] md:w-[420px] rounded-[2.5rem]
            shadow-[0_35px_90px_rgba(0,0,0,0.25)]
            hover:scale-[1.04]
            transition-all duration-500"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold">
            The{" "}
            <span className="text-[color:var(--color-accent)]">
              CBC Story
            </span>
          </h2>
          <p className="text-gray-700 text-lg leading-[1.85] tracking-wide">
            CBC (Crystal Beauty Clear) began as a small Sri Lankan skincare
            brand, founded with a dream: to create pure, effective, and
            luxurious beauty products. Today, CBC stands worldwide as a trusted
            symbol of premium quality.
          </p>
          <p className="text-gray-700 text-lg leading-[1.85] tracking-wide">
            Every formula we create is crafted with love — bringing visible
            transformation, long-lasting radiance, and the luxury your skin
            deserves.
          </p>
        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="bg-[color:var(--color-secondary)] text-white py-24 px-8 md:px-20 rounded-t-[60px] shadow-inner">
        <h2 className="text-center text-4xl font-bold mb-16">
          What Makes{" "}
          <span className="text-[color:var(--color-accent)]">
            CBC Unique?
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem]
          shadow-[0_25px_60px_rgba(0,0,0,0.25)]
          hover:shadow-[0_40px_100px_rgba(250,129,47,0.35)]
          transition-all duration-500">
            <h3 className="text-2xl font-semibold text-[color:var(--color-accent)] mb-4">
              Pure Ingredients
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Safe, natural, gentle, and effective formulas crafted for healthy,
              glowing skin.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem]
          shadow-[0_25px_60px_rgba(0,0,0,0.25)]
          hover:shadow-[0_40px_100px_rgba(250,129,47,0.35)]
          transition-all duration-500">
            <h3 className="text-2xl font-semibold text-[color:var(--color-accent)] mb-4">
              Cruelty-Free
            </h3>
            <p className="text-gray-300 leading-relaxed">
              CBC proudly stands against animal testing — beauty with compassion.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[2.5rem]
          shadow-[0_25px_60px_rgba(0,0,0,0.25)]
          hover:shadow-[0_40px_100px_rgba(250,129,47,0.35)]
          transition-all duration-500">
            <h3 className="text-2xl font-semibold text-[color:var(--color-accent)] mb-4">
              World-Class Quality
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Formulated to meet international standards for visible, reliable
              results.
            </p>
          </div>
        </div>
      </div>

      {/* BRAND JOURNEY */}
      <div className="max-w-6xl mx-auto px-8 md:px-20 py-24">
        <h2 className="text-4xl font-bold text-center mb-10">
          Our{" "}
          <span className="text-[color:var(--color-accent)]">
            Journey
          </span>
        </h2>
        <p className="text-gray-700 text-lg max-w-4xl mx-auto text-center leading-[1.9] tracking-wide">
          Over the years, CBC has grown from a passionate idea into a globally
          recognized skincare and cosmetics brand. With thousands of happy
          customers, we continue to innovate and bring products that elevate
          natural beauty.
        </p>
      </div>

      {/* TEAM SECTION — LUXURY */}
      <div className="bg-white/50 backdrop-blur-2xl py-28 px-8 md:px-20">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold">
            Meet the{" "}
            <span className="text-[color:var(--color-accent)]">
              CBC Team
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {[
            {
              img: "/profile1.png",
              name: "Thamara Perera",
              role: "Founder / CEO",
              desc: "Visionary behind CBC’s mission and global expansion.",
            },
            {
              img: "/profile2.png",
              name: "Dilani Senarath",
              role: "Head of Product",
              desc: "Expert in skincare formulation & quality standards.",
            },
            {
              img: "/profile3.png",
              name: "Nuwan Silva",
              role: "Brand Manager",
              desc: "Ensures CBC shines across global beauty markets.",
            },
          ].map((member) => (
            <div
              key={member.name}
              className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem]
              shadow-[0_30px_80px_rgba(0,0,0,0.2)]
              hover:shadow-[0_45px_120px_rgba(250,129,47,0.4)]
              transition-all duration-700 text-center"
            >
              <div className="relative w-40 h-40 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-[color:var(--color-accent)]/40 blur-2xl"></div>
                <img
                  src={member.img}
                  alt={member.name}
                  className="relative w-40 h-40 object-cover rounded-full ring-4 ring-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                />
              </div>

              <h3 className="text-2xl font-bold tracking-wide">
                {member.name}
              </h3>
              <p className="text-[color:var(--color-accent)] font-semibold mt-1">
                {member.role}
              </p>

              <div className="w-12 h-[2px] bg-[color:var(--color-accent)] mx-auto my-4 rounded-full"></div>

              <p className="text-gray-600 leading-relaxed">
                {member.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
