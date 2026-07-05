import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85",
    headline: "New Season Arrivals",
    sub: "Discover the latest in premium fashion — curated for those who value timeless style.",
    cta: "Explore Collection",
  },
  {
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=85",
    headline: "Style That Speaks",
    sub: "Curated looks for every occasion. Bold, elegant, unmistakably you.",
    cta: "Shop Now",
  },
  {
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85",
    headline: "Premium Quality",
    sub: "Crafted with care, built to last. Experience the difference of true craftsmanship.",
    cta: "Browse All",
  },
  {
    url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=85",
    headline: "Feel The Difference",
    sub: "Exclusive designs, unmatched comfort. Redefine your wardrobe today.",
    cta: "Start Shopping",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const goTo = (idx) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => setAnimating(false), 700);
  };

  const slide = slides[current];

  return (
    <section className="relative w-full h-[65vh] md:h-[80vh] min-h-[480px] overflow-hidden bg-[var(--text-primary)]">
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={s.url}
            alt={s.headline}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      <div className="relative z-10 h-full flex items-center">
        <div className="px-8 md:px-16 lg:px-24 max-w-3xl">
          <p
            key={`eye-${current}`}
            className="animate-fadeIn inline-flex items-center gap-3 text-white/70 text-sm font-medium tracking-widest uppercase mb-5"
          >
            <span className="w-10 h-px bg-white/40" />
            Season 2025
          </p>

          <h1
            key={`h-${current}`}
            className="animate-fadeIn text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {slide.headline}
          </h1>

          <p
            key={`s-${current}`}
            className="animate-fadeIn text-white/80 text-base md:text-lg max-w-xl mb-10 leading-relaxed"
          >
            {slide.sub}
          </p>

          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/collection">
              <button className="btn-primary text-base px-9 py-4 rounded-full shadow-lg shadow-[var(--accent-primary)]/25">
                {slide.cta}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
            <Link to="/about">
              <button className="px-9 py-4 rounded-full border-2 border-white/40 text-white font-semibold text-base hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm">
                Our Story
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 md:left-16 lg:left-24 flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-400 rounded-full cursor-pointer ${
              i === current
                ? "w-10 h-2.5 bg-white shadow-md"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
        <span className="ml-3 text-white/50 text-sm font-mono tracking-wider">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-white/10 hover:bg-white/25 rounded-full border border-white/20 text-white transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center bg-white/10 hover:bg-white/25 rounded-full border border-white/20 text-white transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
