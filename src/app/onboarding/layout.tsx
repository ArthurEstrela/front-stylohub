import Link from "next/link";
import type { ReactNode } from "react";

const STEPS = [
  { label: "Perfil", path: "/onboarding/profile" },
  { label: "Tema", path: "/onboarding/theme" },
  { label: "Primeiro link", path: "/onboarding/first-link" },
];

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stylo-dark flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/marketing">
          <span
            className="text-xl font-bold text-gold-gradient"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Stylohub
          </span>
        </Link>

        {/* Step indicators */}
        <div className="flex items-center gap-3">
          {STEPS.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className="w-7 h-7 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <span className="text-white/40 text-xs font-semibold">{i + 1}</span>
                </div>
                <span className="text-white/30 text-xs hidden sm:block">{step.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-8 h-px bg-white/10 mb-4 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-lg">{children}</div>
      </main>
    </div>
  );
}
