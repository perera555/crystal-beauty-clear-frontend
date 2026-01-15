import { Link } from "react-router-dom";
import Header from "../components/header";


export default function HomePage() {
    
  return (
     
    <div className="w-full min-h-screen bg-linear-to-br from-primary via-white to-accent text-secondary font-sans overflow-hidden">
        <Header />
        
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-16 md:py-24">
        {/* Text */}
        <div className="max-w-xl space-y-6 z-10">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-secondary">
            Discover Your <span className="text-accent">Natural Glow</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to <span className="font-semibold text-accent">Crystal Beauty Clear (CBC)</span> —
            a world of luxury cosmetics designed to enhance your natural beauty.
          </p>

          <p className="text-base text-gray-600 leading-relaxed">
            Explore premium-grade skincare, makeup, and wellness products curated
            for elegance, comfort, and confidence.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <Link
              to="/products"
              className="px-6 py-3 rounded-full bg-linear-to-r from-accent to-orange-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
            >
              Shop Now
            </Link>
            <Link
              to="/about"
              className="px-6 py-3 rounded-full border border-accent text-accent font-semibold hover:bg-accent hover:text-white transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex justify-center w-full md:w-[50%] mb-10 md:mb-0">
          <img
            src="cb.jpg"
            alt="Crystal Beauty Clear Model"
            className="w-[350px] md:w-[450px] drop-shadow-[0_10px_40px_rgba(250,129,47,0.5)] rounded-3xl"
          />
          <div className="absolute w-[250px] h-[250px] bg-accent/30 blur-3xl rounded-full top-0 right-10 -z-10"></div>
        </div>
      </div>

      {/* New Section: Category Highlights */}
      <div className="py-20 px-8 md:px-20 bg-white/70 backdrop-blur-sm">
        <h2 className="text-4xl font-bold text-center mb-10">
          Explore Our <span className="text-accent">Collections</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {[
            { title: "Skincare", img: "skincare.jpg" },
            { title: "Makeup", img: "makeup.jpg" },
            { title: "Fragrances", img: "fragranace.jpg" },
            { title: "Wellness", img: "wellness.jpg" },
          ].map((c) => (
            <div
              key={c.title}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all p-6 cursor-pointer text-center group"
            >
              <img
                src={c.img}
                alt={c.title}
                className="w-32 h-32 mx-auto mb-4 group-hover:scale-110 transition-transform"
              />
              <h3 className="text-xl font-semibold text-secondary">
                {c.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Highlights */}
      <div className="bg-secondary text-white py-20 px-8 md:px-20 rounded-t-[50px] shadow-inner">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <h2 className="text-4xl font-bold">
            Why Choose <span className="text-accent">CBC</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Pure Ingredients",
                text: "High-quality, skin-friendly ingredients for safe and effective beauty.",
              },
              {
                title: "Cruelty-Free",
                text: "CBC proudly stands against animal testing — beauty that’s ethical.",
              },
              {
                title: "Global Standards",
                text: "World-class formulas for long-lasting, radiant results.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all"
              >
                <h3 className="text-2xl font-semibold text-accent mb-3">
                  {f.title}
                </h3>
                <p className="text-gray-300">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-8 md:px-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12">
          Loved By <span className="text-accent">Thousands</span>
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-8 bg-primary rounded-3xl shadow-md hover:shadow-xl transition-all"
            >
              <p className="text-gray-600 italic mb-4">
                "Amazing quality! My skin has never felt better. CBC has become a part of my daily routine."
              </p>
              <h4 className="text-lg font-semibold text-secondary">Sarah M.</h4>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full py-10 bg-primary text-center">
        <h2 className="text-3xl font-semibold text-secondary">
          Welcome to Crystal Beauty Clear
        </h2>
        <p className="mt-4 text-gray-600">
          Explore our collections or reach out to learn how we can elevate your beauty routine.
        </p>
      </div>

      {/* Footer */}
      <div className="bg-secondary py-10 text-center text-gray-300 text-sm">
        <div className="flex justify-center mb-4">
          <img src="/logo.png" alt="CBC Logo" className="w-[120px] opacity-80" />
        </div>
        © {new Date().getFullYear()} Crystal Beauty Clear — All Rights Reserved
      </div>
    </div>
  );
}


