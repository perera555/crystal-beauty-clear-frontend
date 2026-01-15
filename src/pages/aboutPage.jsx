import Header from "../components/header";


export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[color:var(--color-primary)] via-white to-[color:var(--color-accent)] text-[color:var(--color-secondary)] font-sans">
        <Header/>
    

      {/* ABOUT HEADER */}
      <div className="text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-bold">
          About <span className="text-[color:var(--color-accent)]">Crystal Beauty Clear</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Discover the story, passion, and purpose behind
          <span className="font-semibold text-[color:var(--color-accent)]"> CBC Cosmetics</span> —
          your trusted brand for luxury skincare and beauty.
        </p>
      </div>

      {/* MISSION SECTION */}
      <div className="max-w-6xl mx-auto px-8 md:px-20 py-16">
        <div className="bg-white/40 backdrop-blur-md p-10 md:p-14 rounded-3xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Our <span className="text-[color:var(--color-accent)]">Mission</span>
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center">
            Our mission at Crystal Beauty Clear is simple — to empower every person with
            confidence that comes from healthy, glowing skin. We blend nature-inspired
            botanicals with advanced skincare science to deliver visible, lasting results.
          </p>
        </div>
      </div>

      {/* STORY SECTION */}
      <div className="max-w-6xl mx-auto px-8 md:px-20 py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <img
            src="/cbcmodel.jpg"
            alt="CBC Story"
            className="w-[350px] md:w-[420px] rounded-3xl shadow-2xl hover:scale-[1.03] transition-all duration-300"
          />
        </div>

        <div className="space-y-5">
          <h2 className="text-4xl font-bold">
            The <span className="text-[color:var(--color-accent)]">CBC Story</span>
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            CBC (Crystal Beauty Clear) began as a small Sri Lankan skincare brand, founded
            with a dream: to create pure, effective, and luxurious beauty products.
            Today, CBC stands worldwide as a trusted symbol of premium quality.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Every formula we create is crafted with love — bringing visible transformation,
            long-lasting radiance, and the luxury your skin deserves.
          </p>
        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="bg-[color:var(--color-secondary)] text-white py-20 px-8 md:px-20 rounded-t-[50px] shadow-inner">
        <h2 className="text-center text-4xl font-bold mb-12">
          What Makes <span className="text-[color:var(--color-accent)]">CBC Unique?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold text-[color:var(--color-accent)] mb-3">Pure Ingredients</h3>
            <p className="text-gray-300">Safe, natural, gentle, and effective formulas crafted for healthy, glowing skin.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold text-[color:var(--color-accent)] mb-3">Cruelty-Free</h3>
            <p className="text-gray-300">CBC proudly stands against animal testing — beauty with compassion.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold text-[color:var(--color-accent)] mb-3">World-Class Quality</h3>
            <p className="text-gray-300">Formulated to meet international standards for visible, reliable results.</p>
          </div>
        </div>
      </div>

      {/* NEW — BRAND HISTORY SECTION */}
      <div className="max-w-6xl mx-auto px-8 md:px-20 py-20">
        <h2 className="text-4xl font-bold text-center mb-10">
          Our <span className="text-[color:var(--color-accent)]">Journey</span>
        </h2>
        <p className="text-gray-700 text-lg max-w-4xl mx-auto text-center leading-relaxed">
          Over the years, CBC has grown from a passionate idea into a globally recognized
          skincare and cosmetics brand. With thousands of happy customers, we continue to
          innovate and bring products that elevate natural beauty.
        </p>
      </div>

      {/* NEW — TEAM SECTION */}
      <div className="bg-white/40 backdrop-blur-md py-20 px-8 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            Meet the <span className="text-[color:var(--color-accent)]">CBC Team</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <img src="/profile1.png" className="w-32 h-32 mx-auto rounded-full mb-4 shadow-md" />
            <h3 className="text-xl font-bold">Thamara Perera</h3>
            <p className="text-[color:var(--color-accent)] font-semibold">Founder / CEO</p>
            <p className="text-gray-600 mt-2">Visionary behind CBC’s mission and global expansion.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <img src="/profile2.png" className="w-32 h-32 mx-auto rounded-full mb-4 shadow-md" />
            <h3 className="text-xl font-bold">Dilani Senarath</h3>
            <p className="text-[color:var(--color-accent)] font-semibold">Head of Product</p>
            <p className="text-gray-600 mt-2">Expert in skincare formulation & quality standards.</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <img src="/profile3.png" className="w-32 h-32 mx-auto rounded-full mb-4 shadow-md" />
            <h3 className="text-xl font-bold">Nuwan Silva</h3>
            <p className="text-[color:var(--color-accent)] font-semibold">Brand Manager</p>
            <p className="text-gray-600 mt-2">Ensures CBC shines across global beauty markets.</p>
          </div>
        </div>
      </div>
    </div>
  );
}