"use client";

import { useState } from "react";
import Link from "next/link";
import { XCircle, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { creatorApi } from "@/lib/api";
import { Button } from "@/components/ui/button";

export default function CheckoutCanceledPage() {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      const res = await creatorApi.createCheckout();
      const { checkoutUrl } = res.data;
      window.location.href = checkoutUrl;
    } catch {
      toast.error("Erro ao reiniciar checkout. Tente novamente.");
      setIsRetrying(false);
    }
  };

  return (
    <div className="min-h-screen bg-stylo-dark flex items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-white opacity-[0.02] blur-[120px]" />
      </div>

      <div className="relative text-center max-w-md w-full">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <XCircle size={44} className="text-white/30" strokeWidth={1.5} />
          </div>
        </div>

        <h1
          className="text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Pagamento cancelado
        </h1>
        <p className="text-white/50 text-base mb-2">
          Não se preocupe — nenhum valor foi cobrado.
        </p>
        <p className="text-white/35 text-sm mb-10 leading-relaxed">
          Se você encontrou algum problema durante o checkout ou mudou de ideia, você pode tentar
          novamente quando quiser. Seus links e dados estão seguros.
        </p>

        <div className="flex flex-col items-center gap-3">
          <Button
            onClick={handleRetry}
            disabled={isRetrying}
            className="btn-gold-glow bg-stylo-gold hover:bg-stylo-gold-hover text-black font-semibold h-11 px-8"
          >
            {isRetrying ? (
              <Loader2 className="animate-spin mr-2" size={16} />
            ) : (
              <RefreshCw size={16} className="mr-2" />
            )}
            {isRetrying ? "Redirecionando..." : "Tentar novamente"}
          </Button>

          <Link
            href="/dashboard/links"
            className="text-white/40 hover:text-white/70 text-sm transition-colors"
          >
            Voltar ao painel
          </Link>
        </div>

        <p className="mt-8 text-white/25 text-xs">
          Precisa de ajuda?{" "}
          <a href="mailto:suporte@stylohub.io" className="text-white/40 hover:text-white/60 underline">
            suporte@stylohub.io
          </a>
        </p>
      </div>
    </div>
  );
}
