"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Simple CSS confetti particle
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
}

const COLORS = ["#D4AF37", "#FFFFFF", "#9B59B6", "#E74C3C", "#2ECC71", "#3498DB"];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 8 + 4,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 2,
  }));
}

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [particles] = useState<Particle[]>(() => generateParticles(40));
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-stylo-dark flex items-center justify-center px-4 overflow-hidden relative">
      {/* Confetti particles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-sm animate-bounce"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: 0.85,
            }}
          />
        ))}
        {/* Radial gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-stylo-gold opacity-8 blur-[100px]" />
      </div>

      <div
        className={`relative z-10 text-center max-w-md transition-all duration-700 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Crown icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-stylo-gold/20 border-2 border-stylo-gold/40 flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.25)]">
            <Crown size={48} className="text-stylo-gold" strokeWidth={1.5} />
          </div>
        </div>

        <h1
          className="text-4xl font-bold text-gold-gradient mb-3"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Bem-vindo ao PRO!
        </h1>
        <p className="text-white/60 text-lg mb-2">Sua assinatura foi ativada com sucesso.</p>
        <p className="text-white/40 text-sm mb-10">
          Você agora tem acesso a todos os recursos exclusivos do Stylohub PRO. Aproveite!
        </p>

        {/* Feature highlights */}
        <div className="grid grid-cols-2 gap-3 mb-10 text-left">
          {[
            "Analytics em tempo real",
            "Captura de leads",
            "Links ilimitados",
            "Sem marca Stylohub",
          ].map((feature) => (
            <div
              key={feature}
              className="bg-stylo-surface border border-stylo-gold/15 rounded-xl px-4 py-3 flex items-center gap-2"
            >
              <span className="text-stylo-gold text-base">✓</span>
              <span className="text-white/70 text-xs font-medium">{feature}</span>
            </div>
          ))}
        </div>

        <Link href="/dashboard/links">
          <Button className="btn-gold-glow bg-stylo-gold hover:bg-stylo-gold-hover text-black font-semibold h-12 px-8 text-base">
            Ir para o painel
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
