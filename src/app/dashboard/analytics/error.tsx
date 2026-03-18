"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AnalyticsError({ error, reset }: Props) {
  useEffect(() => {
    console.error("[Analytics] Error boundary caught:", error);
  }, [error]);

  return (
    <div className="p-4 sm:p-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-0.5">Analytics</h1>
        <p className="text-white/40 text-sm">Desempenho da sua página.</p>
      </div>

      <div className="mt-6 bg-stylo-surface border border-red-500/20 rounded-2xl p-10 flex flex-col items-center text-center gap-4">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertTriangle size={22} className="text-red-400" />
        </div>

        <div>
          <p className="text-white font-semibold">Erro ao carregar analytics</p>
          <p className="text-white/40 text-sm mt-1 max-w-xs">
            Não foi possível buscar os dados. O resto do painel continua a funcionar normalmente.
          </p>
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white/8 border border-white/10 text-white/70 text-sm hover:text-white hover:border-white/25 transition-colors"
        >
          <RefreshCw size={14} />
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
