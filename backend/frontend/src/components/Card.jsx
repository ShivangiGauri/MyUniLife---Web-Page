function Card({ children, className = "" }) {
  return (
    <div
      className={`
        relative
        bg-white dark:bg-[#1E293B]
        p-6
        rounded-2xl
        shadow-[0_4px_20px_rgba(0,0,0,0.05)]
        dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]
        transition-all duration-300
        hover:shadow-[0_6px_25px_rgba(0,0,0,0.08)]
        dark:hover:shadow-[0_6px_25px_rgba(0,0,0,0.5)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
