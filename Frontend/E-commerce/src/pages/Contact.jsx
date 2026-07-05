import { TopBar } from "../component/TopBar";
import Footer from "../component/Footer";
import { useState } from "react";

const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-16 py-12 lg:py-16">
        <div className="text-center mb-12 lg:mb-16">
          <span className="section-tag">Get in Touch</span>
          <h1 className="section-title mb-4">Contact Us</h1>
          <p className="section-subtitle">
            Have a question, feedback, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: <ContactIcon />, title: "Email", content: "contact@NovaCart.com" },
              { icon: <PhoneIcon />, title: "Phone", content: "+91 xxxxxxxxxx" },
              { icon: <LocationIcon />, title: "Address", content: "123 NovaCart Street, Mumbai, India" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-[var(--bg-primary)] rounded-2xl border border-[var(--border-color)] shadow-[var(--shadow-sm)]">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] text-[var(--accent-primary)] flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.content}</p>
                </div>
              </div>
            ))}

            <div className="p-5 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-color)]">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Business Hours</h3>
              <div className="space-y-1 text-sm text-[var(--text-secondary)]">
                <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                <p>Saturday: 10:00 AM – 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-[var(--bg-primary)] rounded-3xl border border-[var(--border-color)] shadow-[var(--shadow-sm)]">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Message Sent!</h3>
                <p className="text-sm text-[var(--text-secondary)]">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[var(--bg-primary)] rounded-3xl border border-[var(--border-color)] p-8 lg:p-10 shadow-[var(--shadow-sm)] space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="input-label">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="input-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="input-label">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="input-label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    className="input-field resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full text-base py-4 rounded-xl shadow-lg shadow-[var(--accent-primary)]/20"
                >
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
