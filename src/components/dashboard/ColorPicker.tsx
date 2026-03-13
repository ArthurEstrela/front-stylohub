"use client";

import { useRef } from "react";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
  label: string;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSwatchClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-1.5">
      <Label className="text-white/70 text-sm">{label}</Label>
      <div className="flex items-center gap-3">
        {/* Color swatch button */}
        <button
          type="button"
          onClick={handleSwatchClick}
          className="w-10 h-10 rounded-lg border-2 border-white/15 hover:border-white/30 transition-colors shadow-sm relative overflow-hidden"
          style={{ backgroundColor: value }}
          title={`Selecionar cor — atual: ${value}`}
        >
          {/* Native color input hidden under the swatch */}
          <input
            ref={inputRef}
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </button>

        {/* Hex value display */}
        <div className="flex items-center gap-1.5">
          <span className="text-white/30 text-sm font-mono">#</span>
          <input
            type="text"
            value={value.replace("#", "").toUpperCase()}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
              if (raw.length === 6) {
                onChange(`#${raw}`);
              }
            }}
            className="w-20 bg-stylo-dark border border-white/10 rounded-md px-2 py-1.5 text-white text-sm font-mono uppercase focus:outline-none focus:ring-1 focus:ring-stylo-gold focus:border-stylo-gold"
            maxLength={6}
            placeholder="D4AF37"
          />
        </div>
      </div>
    </div>
  );
}
