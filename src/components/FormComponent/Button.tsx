import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  onClick,
  className = "",
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
    secondary:
      "bg-slate-200 text-slate-700 hover:bg-slate-300 focus:ring-slate-300",
    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className} ${
        disabled || loading
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer"
      }`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;