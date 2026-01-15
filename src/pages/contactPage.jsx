import Header from "../components/header";


export default function ContactPage() { 
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[color:var(--color-primary)] via-white to-[color:var(--color-accent)] text-[color:var(--color-secondary)] font-sans overflow-x-hidden">
      <Header/>
     

      {/* Page Title */}
      <div className="text-center py-16 px-6">
        <h1 className="text-5xl md:text-6xl font-bold">
          Get in <span className="text-[color:var(--color-accent)]">Touch</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          We’re here to support your beauty journey. Reach out for product inquiries, order assistance, business partnerships, or general support.
        </p>
      </div>

      {/* Contact Info + Form */}
      <div className="max-w-7xl mx-auto px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 py-10">
        {/* Info Card */}
        <div className="bg-white/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl space-y-6">
          <h2 className="text-3xl font-bold mb-4">
            Contact <span className="text-[color:var(--color-accent)]">Information</span>
          </h2>
          <p className="text-gray-700 text-lg"><strong>Email:</strong> support@crystalbeautyclear.lk</p>
          <p className="text-gray-700 text-lg"><strong>Phone:</strong> +94 76 738 3649</p>
          <p className="text-gray-700 text-lg"><strong>Hotline:</strong> +94 71 555 8899</p>
          <p className="text-gray-700 text-lg"><strong>WhatsApp:</strong> +94 76 738 3649</p>
          <p className="text-gray-700 text-lg"><strong>Address:</strong> Airforce Road, Katukurunda, Kalutara South, Sri Lanka</p>

          {/* Social Links */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-[color:var(--color-accent)] mb-3">Follow Us</h3>
            <ul className="space-y-2 text-gray-700 text-lg">
              <li>Facebook: CBC Cosmetics</li>
              <li>Instagram: @crystalbeautyclear</li>
              <li>TikTok: @cbc_beauty_global</li>
            </ul>
          </div>

          {/* Hours */}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-[color:var(--color-accent)] mb-2">Working Hours</h3>
            <p className="text-gray-700">Monday – Friday: 9:00 AM – 6:00 PM</p>
            <p className="text-gray-700">Saturday: 9:00 AM – 2:00 PM</p>
            <p className="text-gray-700">Sunday: Closed</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/40 backdrop-blur-lg p-10 rounded-3xl shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Send Us a <span className="text-[color:var(--color-accent)]">Message</span>
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block text-lg mb-1">Your Name</label>
              <input type="text" placeholder="Enter your name" className="w-full p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]" />
            </div>

            <div>
              <label className="block text-lg mb-1">Email Address</label>
              <input type="email" placeholder="Enter your email" className="w-full p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]" />
            </div>

            <div>
              <label className="block text-lg mb-1">Phone Number</label>
              <input type="tel" placeholder="Enter your phone number" className="w-full p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]" />
            </div>

            <div>
              <label className="block text-lg mb-1">Message Type</label>
              <select className="w-full p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]">
                <option>General Inquiry</option>
                <option>Product Information</option>
                <option>Order & Delivery</option>
                <option>Partnership Request</option>
                <option>Feedback / Complaint</option>
              </select>
            </div>

            <div>
              <label className="block text-lg mb-1">Your Message</label>
              <textarea rows="5" placeholder="Write your message..." className="w-full p-4 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]" />
            </div>

            <button type="submit" className="w-full bg-[color:var(--color-accent)] text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:scale-[1.03] transition-all duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Store Visit Section */}
      <div className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Visit <span className="text-[color:var(--color-accent)]">Our Store</span>
        </h2>
        <p className="text-lg max-w-2xl mx-auto text-gray-700 mb-10">
          Experience our full range of beauty and skincare products in person at our CBC showroom.
          Our friendly consultants are ready to assist you with demonstrations and personalized skincare guidance.
        </p>

        <img
          src="/cbcmodel.jpg"
          alt="CBC Store"
          className="w-[350px] md:w-[500px] mx-auto rounded-3xl shadow-2xl hover:scale-[1.03] transition-all duration-300"
        />
      </div>
    </div>
  );
}