import React from "react";

export const Card = React.forwardRef(({ className = "", children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`p-6 rounded-2xl shadow-sm bg-white dark:bg-slate-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";
