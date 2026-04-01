"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: "primary" | "secondary";
}

export default function Button({ title, variant = "primary", className = "", ...props }: ButtonProps) {
  const base = "rounded-lg px-4 py-2 text-sm font-semibold transition-opacity disabled:opacity-50";
  const variants = {
    primary: "bg-primary text-white",
    secondary: "border border-primary text-primary bg-white",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {title}
    </button>
  );
}