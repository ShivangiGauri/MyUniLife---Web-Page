import React from "react";

export const Table = ({ children, className = "" }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className={`w-full text-left border-collapse whitespace-nowrap ${className}`}>
        {children}
      </table>
    </div>
  );
};

export const Thead = ({ children, className = "" }) => {
  return (
    <thead className={`bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 ${className}`}>
      {children}
    </thead>
  );
};

export const Tbody = ({ children, className = "" }) => {
  return <tbody className={`divide-y divide-slate-200 dark:divide-slate-700 ${className}`}>{children}</tbody>;
};

export const Tr = ({ children, className = "", onClick }) => {
  return (
    <tr
      onClick={onClick}
      className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </tr>
  );
};

export const Th = ({ children, className = "" }) => {
  return (
    <th className={`px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300 ${className}`}>
      {children}
    </th>
  );
};

export const Td = ({ children, className = "" }) => {
  return (
    <td className={`px-6 py-4 text-sm text-slate-600 dark:text-slate-400 ${className}`}>
      {children}
    </td>
  );
};
