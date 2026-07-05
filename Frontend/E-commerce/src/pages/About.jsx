import Footer from "../component/Footer";
import { TopBar } from "../component/TopBar";
import { FaLeaf, FaAward, FaUsers, FaUserCircle } from "react-icons/fa";

export function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />

      {/* Hero */}
      <section className="relative w-full h-[400px] lg:h-[500px] bg-[var(--text-primary)]">
        <img
          src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1400&q=80"
          alt="NovaCart clothing"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <span className="section-tag text-white/90 bg-white/10 mb-4">Our Story</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            About NovaCart
          </h1>
          <p className="text-white/80 md:text-lg max-w-3xl drop-shadow-md leading-relaxed">
            We create timeless, high-quality apparel that celebrates your authentic self. From daily moments to life's milestones, NovaCart is your trusted companion in style and comfort.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-6">Our Story</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Founded with a mission to craft apparel that blends style, comfort, and authenticity, NovaCart has grown into a brand trusted by thousands of customers. Each piece is designed to last, celebrate life's moments, and reflect your unique style.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              We are committed to sustainability, quality, and timeless designs that make your wardrobe both functional and memorable.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
              alt="Our team"
              className="rounded-2xl shadow-[var(--shadow-lg)]"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--bg-secondary)] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 text-center">
          <span className="section-tag">Why Choose Us</span>
          <h2 className="section-title mb-12 lg:mb-16">What Sets Us Apart</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="flex flex-col items-center p-8 lg:p-10 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent-light)] text-[var(--accent-primary)] flex items-center justify-center mb-5">
                <FaAward className="text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Premium Quality</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Every garment is crafted with care and premium materials for comfort and durability.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 lg:p-10 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <FaLeaf className="text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Sustainable Practices</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Eco-friendly materials and production methods to protect our planet.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 lg:p-10 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <FaUsers className="text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Trusted by Customers</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Thousands of happy customers rely on NovaCart for quality and style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-16 lg:py-24">
        <div className="text-center mb-12 lg:mb-16">
          <span className="section-tag">Team</span>
          <h2 className="section-title">Meet the Team</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {[
            { role: "Founder" },
            { role: "Designer" },
            { role: "Marketing" },
            { role: "Operations" },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] p-6 lg:p-8 hover:shadow-[var(--shadow-md)] transition-shadow duration-300">
              <FaUserCircle className="text-5xl lg:text-6xl text-[var(--text-muted)] mb-4" />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">Shivendra Tarate</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
