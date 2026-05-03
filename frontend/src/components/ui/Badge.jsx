import React from "react";

const variants = {
  default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  primary: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  
  // Role specific variants
  student: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  club: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  admin: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  superadmin: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
};

export const Badge = ({ children, variant = "default", className = "" }) => {
  const variantStyle = variants[variant] || variants.default;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyle} ${className}`}>
      {children}
    </span>
  );
};
