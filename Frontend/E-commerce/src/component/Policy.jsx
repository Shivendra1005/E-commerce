const policies = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: "text-[var(--accent-primary)]",
    bg: "bg-[var(--accent-light)]",
    title: "Hassle-Free Exchanges",
    desc: "Exchange products within 7 days of delivery with no extra charges.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    title: "Premium Quality Guaranteed",
    desc: "Every product is carefully selected to ensure the highest quality standards.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: "text-amber-600",
    bg: "bg-amber-50",
    title: "24/7 Customer Support",
    desc: "Our dedicated team is always available to help with your queries.",
  },
];

const Policy = () => {
  return (
    <section className="section-spacing px-6 lg:px-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
        {policies.map((p, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-8 lg:p-10 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-14 h-14 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center mb-5`}>
              {p.icon}
            </div>
            <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2.5">{p.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Policy;
