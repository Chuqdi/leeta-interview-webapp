interface ThemeTextProps {
  text: string;
  weight?: "normal" | "bold";
  fontSize?: number;
  color?: string;
  className?: string;
}

export default function ThemeText({
  text,
  weight = "normal",
  fontSize,
  color,
  className = "",
}: ThemeTextProps) {
  return (
    <span
    
      className={`${weight === "bold" ? "font-bold" : "font-normal"} ${className}`}
      style={{ ...(fontSize && { fontSize }), ...(color && { color }) }}
    >
      {text}
    </span>
  );
}