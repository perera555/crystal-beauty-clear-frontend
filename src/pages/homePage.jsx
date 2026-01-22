import Header from "../components/header";

export default function HomePage() {
  return (
    <div className="w-full min-h-screen overflow-hidden font-sans text-secondary bg-linear-to-br from-primary via-white to-accent">
      <Header />

      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-16 md:py-24">
        <div className="z-10 max-w-xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Discover Your <span className="text-accent">Natural Glow</span>
          </h1>

          <p className="text-lg leading-relaxed text-gray-700">
            Welcome to{" "}
            <span className="font-semibold text-accent">
              Crystal Beauty Clear (CBC)
            </span>{" "}
            — we’re truly glad you’re here. Step into a world where science meets
            elegance, and beauty is designed to celebrate <em>you</em>.
          </p>

          <p className="text-base leading-relaxed text-gray-600">
            Whether you’re beginning your beauty journey or refining your daily
            routine, CBC offers thoughtfully crafted skincare, makeup, and
            wellness solutions created to help you feel confident, radiant, and
            comfortable in your own skin.
          </p>
        </div>

        <div className="relative flex w-full justify-center mb-10 md:mb-0 md:w-1/2">
          <img
            src="cb.jpg"
            alt="Crystal Beauty Clear Model"
            loading="lazy"
            className="w-[350px] md:w-[450px] rounded-3xl drop-shadow-[0_10px_40px_rgba(250,129,47,0.5)]"
          />
          <div className="absolute top-0 right-10 -z-10 h-[250px] w-[250px] rounded-full bg-accent/30 blur-3xl" />
        </div>
      </div>

      {/* Category Highlights */}
      <div className="bg-white/70 py-20 px-8 backdrop-blur-sm md:px-20">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Explore Our <span className="text-accent">Collections</span>
        </h2>

        <p className="mx-auto mb-14 max-w-3xl text-center text-gray-600">
          Take your time and explore. Each CBC collection is carefully designed
          to support your beauty needs while offering a luxurious, calming, and
          results-driven experience you’ll love coming back to.
        </p>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Skincare", img: "skincare.jpg" },
            { title: "Makeup", img: "makeup.jpg" },
            { title: "Fragrances", img: "fragranace.jpg" },
            { title: "Wellness", img: "wellness.jpg" },
          ].map((c) => (
            <div
              key={c.title}
              className="group cursor-pointer rounded-3xl bg-white p-6 text-center shadow-xl transition-all hover:shadow-2xl"
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="mx-auto mb-4 h-32 w-32 transition-transform group-hover:scale-110"
              />
              <h3 className="mb-2 text-xl font-semibold">{c.title}</h3>
              <p className="text-sm text-gray-500">
                Designed to care for you — beautifully, gently, and effectively.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Highlights */}
      <div className="rounded-t-[50px] bg-secondary py-20 px-8 text-white shadow-inner md:px-20">
        <div className="mx-auto max-w-6xl space-y-12 text-center">
          <h2 className="text-4xl font-bold">
            Why Choose <span className="text-accent">CBC</span>?
          </h2>

          <p className="mx-auto max-w-3xl text-gray-300">
            Because your beauty deserves care, honesty, and excellence. At CBC,
            every product is created with respect for your skin, your values,
            and your everyday life.
          </p>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {[
              {
                title: "Pure Ingredients",
                text: "Gentle, skin-loving ingredients selected to nourish, protect, and enhance your natural beauty with confidence.",
              },
              {
                title: "Cruelty-Free",
                text: "Made with compassion — never tested on animals, always aligned with ethical beauty standards.",
              },
              {
                title: "Global Standards",
                text: "Formulated to meet trusted international quality standards for safety, performance, and luxury.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-3xl bg-white/10 p-8 shadow-lg backdrop-blur-lg transition-all hover:shadow-2xl"
              >
                <h3 className="mb-3 text-2xl font-semibold text-accent">
                  {f.title}
                </h3>
                <p className="text-gray-300">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white py-20 px-8 md:px-20">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Loved By <span className="text-accent">Thousands</span>
        </h2>

        <p className="mx-auto mb-14 max-w-3xl text-center text-gray-600">
          Join a growing community of customers who trust CBC to be part of
          their self-care, confidence, and daily beauty rituals.
        </p>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
          {[
            {
              text: "I’ve tried many beauty brands, but CBC truly stands out. My skin feels healthier, smoother, and more radiant than ever.",
              name: "Emily R.",
            },
            {
              text: "CBC products feel luxurious yet gentle. I love knowing I’m using something that’s effective, ethical, and beautifully made.",
              name: "Aisha K.",
            },
            {
              text: "From the first use, I noticed a difference. CBC has become an essential part of my daily routine — I wouldn’t switch back.",
              name: "Daniel T.",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="rounded-3xl bg-primary p-8 shadow-md transition-all hover:shadow-xl"
            >
              <p className="mb-4 italic text-gray-600">"{t.text}"</p>
              <h4 className="text-lg font-semibold text-secondary">
                {t.name}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="w-full bg-primary py-10 text-center">
        <h2 className="text-3xl font-semibold text-secondary">
          Beauty Made With Care
        </h2>
        <p className="mt-4 text-gray-600">
          Thoughtfully created formulas designed to bring balance, comfort, and
          elegance to your beauty journey.
        </p>
      </div>

      {/* Footer */}
      <div className="bg-secondary py-10 text-center text-sm text-gray-300">
        <div className="mb-4 flex justify-center">
          <img
            src="/logo.png"
            alt="CBC Logo"
            loading="lazy"
            className="w-[120px] opacity-80"
          />
        </div>

        <p className="mb-2 text-gray-400">
          Beauty crafted with care, confidence, and timeless elegance.
        </p>

        <p className="mb-4 text-gray-500">
          Premium skincare, makeup, fragrances, and wellness essentials —
          thoughtfully designed for your everyday glow.
        </p>

        <p className="text-gray-500">
          © {new Date().getFullYear()} Crystal Beauty Clear — All Rights Reserved
        </p>
      </div>
    </div>
  );
}
