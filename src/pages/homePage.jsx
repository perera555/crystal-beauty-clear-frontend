import Header from "../components/header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [bestSellers, setBestSellers] = useState([]);

  // ---------------- FETCH BEST SELLERS ----------------
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((res) => {
        setBestSellers(res.data.slice(0, 4));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full min-h-screen overflow-hidden font-sans text-secondary bg-linear-to-br from-primary via-white to-accent">
      <Header />

      {/* ================= HERO SECTION ================= */}
      <div className="relative flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-20 md:py-32">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[350px] w-[350px] rounded-full bg-accent/20 blur-[120px]" />

        <div className="relative z-10 max-w-xl space-y-7">
          <span className="tracking-[0.25em] text-xs font-medium text-accent">
            LUXURY BEAUTY
          </span>

          <h1 className="text-5xl md:text-6xl font-semibold leading-[1.15] tracking-tight">
            Crystal Beauty Clear
            <span className="block mt-2 text-accent font-bold tracking-wide">
              Natural Glow
            </span>
          </h1>

          <p className="text-lg leading-relaxed text-gray-700">
            Where refined science and timeless elegance come together to
            celebrate your skin.
          </p>

          <p className="text-base leading-relaxed text-gray-600 max-w-lg">
            Thoughtfully crafted skincare, makeup, and wellness solutions
            designed to elevate your daily ritual with confidence, comfort, and
            understated luxury.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("best-sellers")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-6 rounded-full bg-accent px-10 py-3 text-white
                       shadow-[0_15px_40px_rgba(250,129,47,0.45)]
                       hover:opacity-90 transition"
          >
            Explore Best Sellers
          </button>
        </div>

        {/* ===== LUXURY IMAGE STYLE (ONLY CHANGE) ===== */}
        <div className="relative flex w-full justify-center mb-14 md:mb-0 md:w-1/2">
          {/* gradient frame */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="h-[420px] w-[320px] md:h-[520px] md:w-[400px]
                            rounded-[40px]
                            bg-linear-to-br from-accent/30 via-white/60 to-primary/40
                            blur-[2px]" />
          </div>

          {/* image wrapper */}
          <div
            className="relative rounded-[36px] overflow-hidden
                       shadow-[0_30px_90px_rgba(0,0,0,0.18)]
                       transition-transform duration-500 hover:-translate-y-1"
          >
            {/* glass highlight */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />

            <img
              src="cb.jpg"
              alt="Crystal Beauty Clear Model"
              loading="lazy"
              className="relative w-[360px] md:w-[470px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* ================= CATEGORY HIGHLIGHTS ================= */}
      <div className="bg-white/70 py-20 px-8 backdrop-blur-sm md:px-20">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Explore Our <span className="text-accent">Collections</span>
        </h2>

        <p className="mx-auto mb-14 max-w-3xl text-center text-gray-600">
          Each CBC collection is carefully designed to support your beauty needs
          while offering a luxurious, results-driven experience.
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
              className="group cursor-pointer rounded-3xl bg-white p-6 text-center
                         shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                className="mx-auto mb-4 h-32 w-32 transition-transform group-hover:scale-110"
              />
              <h3 className="mb-2 text-xl font-semibold">{c.title}</h3>
              <p className="text-sm text-gray-500">
                Designed to care for you — beautifully and gently.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= BRAND HIGHLIGHTS ================= */}
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

      {/* ================= BEST SELLERS ================= */}
      <div id="best-sellers" className="bg-white/80 py-28 px-8 md:px-20">
        <h2 className="mb-16 text-center text-4xl font-bold">
          Best <span className="text-accent">Sellers</span>
        </h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <div
              key={product._id}
              className="group relative rounded-[32px] bg-white px-6 pt-10 pb-8
                         text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                         transition-all hover:-translate-y-2 hover:shadow-[0_35px_90px_rgba(0,0,0,0.12)]"
            >
              <span className="absolute left-1/2 top-4 -translate-x-1/2
                               rounded-full bg-secondary px-4 py-1
                               text-[10px] tracking-[0.25em] text-primary">
                BEST SELLER
              </span>

              <div className="mx-auto mb-6 flex h-44 items-center justify-center">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="text-lg font-semibold leading-snug">
                {product.name}
              </h3>

              <p className="mt-3 text-accent font-medium tracking-wide">
                LKR {product.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= TESTIMONIALS ================= */}
      <div className="bg-white py-20 px-8 md:px-20">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Loved By <span className="text-accent">Thousands</span>
        </h2>

        <p className="mx-auto mb-14 max-w-3xl text-center text-gray-600">
          Join a growing community of customers who trust CBC to be part of their
          self-care and daily beauty rituals.
        </p>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
          {[
            {
              text: "I’ve tried many beauty brands, but CBC truly stands out. My skin feels healthier, smoother, and more radiant than ever.",
              name: "Emily R.",
            },
            {
              text: "CBC products feel luxurious yet gentle. I love knowing I’m using something that’s effective and ethical.",
              name: "Aisha K.",
            },
            {
              text: "From the first use, I noticed a difference. CBC has become an essential part of my routine.",
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

      {/* ================= FOOTER ================= */}
      <div className="bg-secondary py-12 text-center text-sm text-gray-300">
        <div className="mb-5 flex justify-center">
          <img
            src="/logo.png"
            alt="CBC Logo"
            loading="lazy"
            className="w-[120px] opacity-80"
          />
        </div>

        <p className="mb-2 text-gray-400 tracking-wide">
          Beauty crafted with care, confidence, and timeless elegance.
        </p>

        <p className="mb-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
          Premium skincare, makeup, fragrances, and wellness essentials —
          thoughtfully designed to elevate your everyday glow.
        </p>

        <p className="text-gray-500">
          © {new Date().getFullYear()} Crystal Beauty Clear — All Rights Reserved
        </p>
      </div>
    </div>
  );
}
