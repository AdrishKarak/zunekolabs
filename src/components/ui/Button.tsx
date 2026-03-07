import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: [
    "relative overflow-hidden",
    "bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-900",
    "text-white font-semibold tracking-wide",
    "shadow-[0_4px_24px_rgba(16,185,129,0.25)]",
    "hover:shadow-[0_6px_32px_rgba(16,185,129,0.4)]",
    "hover:from-emerald-500 hover:via-emerald-600 hover:to-green-800",
    "active:scale-[0.97]",
    "border border-emerald-500/30",
    "after:absolute after:inset-0 after:bg-white/5 after:opacity-0 hover:after:opacity-100 after:transition-opacity",
  ].join(" "),
  secondary: [
    "relative overflow-hidden bg-transparent",
    "text-emerald-400",
    "border-2 border-emerald-600",
    "hover:bg-emerald-950 hover:border-emerald-400 hover:text-emerald-300",
    "hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    "active:scale-[0.97]",
  ].join(" "),
  ghost: [
    "text-emerald-400 bg-transparent",
    "hover:text-emerald-300 hover:bg-emerald-950/60",
    "active:opacity-70",
  ].join(" "),
};

const sizeStyles: Record<Size, string> = {
  sm: "text-sm px-4 py-2 rounded-lg",
  md: "text-base px-6 py-3 rounded-xl",
  lg: "text-lg px-8 py-4 rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  iconPosition = "right",
  isLoading = false,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={[
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 cursor-pointer",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && <span className="flex items-center">{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span className="flex items-center">{icon}</span>}
        </>
      )}
    </button>
  );
}