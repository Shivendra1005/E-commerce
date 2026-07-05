const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-1 h-8 bg-[var(--accent-primary)] rounded-full" />
      <h2 className="text-2xl font-bold text-[var(--text-primary)]">
        <span className="text-[var(--text-muted)] font-normal">{text1} </span>
        {text2}
      </h2>
    </div>
  );
};

export default Title;
