"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PricingCard } from "@/components/marketing/PricingCard";

const FREE_FEATURES = [
  "5 links ativos",
  "Temas básicos",
  "Página pública personalizada",
  "URL stylohub.io/seunome",
  "Suporte por e-mail",
];

const PRO_FEATURES = [
  "Links ilimitados",
  "Todos os temas + editor avançado",
  "Analytics detalhado",
  "Captura de leads",
  "Embed YouTube & Spotify",
  "Remove marca Stylohub",
  "URL personalizada",
  "Suporte prioritário",
];

export default function PricingPage() {
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="bg-stylo-dark min-h-screen">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-96 rounded-full bg-stylo-gold opacity-5 blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Planos <span className="text-gold-gradient">simples</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Comece de graça. Evolua quando precisar. Sem contratos longos.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span
              className={`text-sm font-medium transition-colors ${
                !isYearly ? "text-white" : "text-white/40"
              }`}
            >
              Mensal
            </span>
            <button
              onClick={() => setIsYearly((v) => !v)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isYearly ? "bg-stylo-gold" : "bg-white/10"
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  isYearly ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${
                isYearly ? "text-white" : "text-white/40"
              }`}
            >
              Anual
              <span className="ml-2 text-xs bg-stylo-gold/20 text-stylo-gold px-2 py-0.5 rounded-full">
                -20%
              </span>
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <PricingCard
            plan="FREE"
            price={0}
            yearlyPrice={0}
            isYearly={isYearly}
            features={FREE_FEATURES}
            ctaLabel="Começar Grátis"
            onCta={() => router.push("/auth/register")}
          />
          <PricingCard
            plan="PRO"
            price={29.9}
            yearlyPrice={23.9}
            isYearly={isYearly}
            features={PRO_FEATURES}
            ctaLabel="Assinar PRO"
            onCta={() => router.push("/auth/register")}
          />
        </div>

        {/* FAQ teaser */}
        <p className="text-center text-white/30 text-sm mt-12">
          Tem dúvidas?{" "}
          <a href="mailto:suporte@stylohub.io" className="text-stylo-gold hover:underline">
            Entre em contato
          </a>
        </p>
      </div>
    </div>
  );
}
