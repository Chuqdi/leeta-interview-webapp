"use client";

interface CheckboxProps {
  checked: boolean;
  onCheck: (val: boolean) => void;
}

export default function Checkbox({ checked, onCheck }: CheckboxProps) {
  return (
    <button
      onClick={() => onCheck(!checked)}
      className={`relative flex h-5 w-9 rounded-xl p-0.5 transition-colors duration-200 bg-primary ${
        checked ? "justify-end" : "justify-start"
      }`}
    >
      <span className="h-full w-4 rounded-full bg-white block" />
    </button>
  );
}