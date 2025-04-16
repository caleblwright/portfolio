// src/components/Input.tsx
//TODO: LEARN
import React from "react";

interface Props {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  className?: string;
  error?: string;
}

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  className,
  error,
}: Props) {
  return (
    <div className="flex flex-col mb-4">
      <label className="mb-1 text-sm text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
