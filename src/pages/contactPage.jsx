import Header from "../components/header";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[color:var(--color-primary)] via-white to-[color:var(--color-accent)] text-[color:var(--color-secondary)] font-sans overflow-x-hidden">
      <Header />

      {/* Page Title */}
      <div className="text-center py-20 px-6 relative">
        <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-[color:var(--color-accent)]"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Get in{" "}
          <span className="text-[color:var(--color-accent)]">Touch</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          We’re here to support your beauty journey. Reach out for product
          inquiries, order assistance, business partnerships, or general
          support.
        </p>
      </div>

      {/* Contact Info + Form */}
      <div className="max-w-7xl mx-auto px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-14 py-10">
        {/* Info Card */}
        <div className="bg-white/50 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] space-y-6 border border-white/30">
          <h2 className="text-3xl font-bold mb-4">
            Contact{" "}
            <span className="text-[color:var(--color-accent)]">
              Information
            </span>
          </h2>

          <div className="space-y-3 text-lg text-gray-700">
            <p><strong>Email:</strong> support@crystalbeautyclear.lk</p>
            <p><strong>Phone:</strong> +94 76 738 3649</p>
            <p><strong>Hotline:</strong> +94 71 555 8899</p>
            <p><strong>WhatsApp:</strong> +94 76 738 3649</p>
            <p>
              <strong>Address:</strong> Airforce Road, Katukurunda, Kalutara
              South, Sri Lanka
            </p>
          </div>

          {/* Social Links */}
          <div className="pt-6 border-t border-gray-200/60">
            <h3 className="text-xl font-bold text-[color:var(--color-accent)] mb-3">
              Follow Us
            </h3>
            <ul className="space-y-2 text-gray-700 text-lg">
              <li>Facebook: CBC Cosmetics</li>
              <li>Instagram: @crystalbeautyclear</li>
              <li>TikTok: @cbc_beauty_global</li>
            </ul>
          </div>

          {/* Hours */}
          <div className="pt-6 border-t border-gray-200/60">
            <h3 className="text-xl font-bold text-[color:var(--color-accent)] mb-2">
              Working Hours
            </h3>
            <p className="text-gray-700">
              Monday – Friday: 9:00 AM – 6:00 PM
            </p>
            <p className="text-gray-700">
              Saturday: 9:00 AM – 2:00 PM
            </p>
            <p className="text-gray-700">Sunday: Closed</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/50 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/30">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Send Us a{" "}
            <span className="text-[color:var(--color-accent)]">Message</span>
          </h2>

          <form className="space-y-6">
            {[
              ["Your Name", "text", "Enter your name"],
              ["Email Address", "email", "Enter your email"],
              ["Phone Number", "tel", "Enter your phone number"],
            ].map(([label, type, placeholder]) => (
              <div key={label}>
                <label className="block text-lg mb-1">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  className="w-full p-4 rounded-2xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)] focus:border-transparent transition"
                />
              </div>
            ))}

            <div>
              <label className="block text-lg mb-1">Message Type</label>
              <select className="w-full p-4 rounded-2xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)] transition">
                <option>General Inquiry</option>
                <option>Product Information</option>
                <option>Order & Delivery</option>
                <option>Partnership Request</option>
                <option>Feedback / Complaint</option>
              </select>
            </div>

            <div>
              <label className="block text-lg mb-1">Your Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full p-4 rounded-2xl border border-gray-300 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)] transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[color:var(--color-accent)] to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-xl hover:scale-[1.04] active:scale-[0.98] transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Store Visit Section */}
      <div className="py-24 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">
          Visit{" "}
          <span className="text-[color:var(--color-accent)]">Our Store</span>
        </h2>
        <p className="text-lg max-w-2xl mx-auto text-gray-700 mb-12">
          Experience our full range of beauty and skincare products in person at
          our CBC showroom. Our friendly consultants are ready to assist you
          with demonstrations and personalized skincare guidance.
        </p>

        <img
          src="/cbc store.png"
          alt="CBC Store"
          className="w-[350px] md:w-[520px] mx-auto rounded-3xl shadow-2xl hover:scale-[1.04] transition-all duration-300 mb-16"
        />

        {/* Google Map */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/40">
          <iframe
            title="CBC Location"
            src="https://www.google.com/maps?q=Katukurunda%20Kalutara%20Sri%20Lanka&output=embed"
            className="w-full h-[400px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
