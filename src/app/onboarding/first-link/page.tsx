"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2, PartyPopper } from "lucide-react";
import { toast } from "sonner";

import { addLinkWidgetSchema, type AddLinkWidgetFormValues } from "@/lib/validations";
import { creatorApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingFirstLinkPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddLinkWidgetFormValues>({
    resolver: zodResolver(addLinkWidgetSchema),
  });

  const onSubmit = async (values: AddLinkWidgetFormValues) => {
    setIsSaving(true);
    try {
      await creatorApi.addWidget({
        type: "LINK",
        order: 0,
        title: values.title,
        url: values.url,
      });
      setSuccess(true);
    } catch {
      toast.error("Erro ao adicionar link. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  if (success) {
    return (
      <div className="bg-stylo-surface border border-white/10 rounded-2xl p-8 text-center">
        {/* CSS confetti burst */}
        <div className="relative flex justify-center mb-6">
          <div className="relative">
            <PartyPopper size={64} className="text-stylo-gold" strokeWidth={1.5} />
            {/* Confetti dots */}
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="absolute w-2 h-2 rounded-full animate-ping"
                style={{
                  backgroundColor: i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#FFFFFF" : "#9B59B6",
                  top: `${50 + 40 * Math.sin((i / 12) * 2 * Math.PI)}%`,
                  left: `${50 + 40 * Math.cos((i / 12) * 2 * Math.PI)}%`,
                  animationDelay: `${i * 0.08}s`,
                  animationDuration: "1s",
                  opacity: 0.8,
                }}
              />
            ))}
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Primeiro link adicionado!</h1>
        <p className="text-white/50 text-sm mb-8">
          Seu perfil está pronto. Agora vamos ao painel para adicionar mais conteúdo.
        </p>

        <Button
          onClick={() => router.push("/dashboard/links")}
          className="btn-gold-glow bg-stylo-gold hover:bg-stylo-gold-hover text-black font-semibold h-11 px-8"
        >
          Ir para o painel
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-stylo-surface border border-white/10 rounded-2xl p-8">
      <div className="mb-6">
        <span className="text-xs font-semibold text-stylo-gold tracking-widest uppercase">
          Passo 3 de 3
        </span>
        <h1 className="text-2xl font-bold text-white mt-1">Adicione seu primeiro link</h1>
        <p className="text-white/50 text-sm mt-1">
          Pode ser seu Instagram, YouTube, site — qualquer coisa.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div className="space-y-1.5">
          <Label htmlFor="title" className="text-white/70 text-sm">
            Título do link
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Ex: Meu Instagram"
            className="bg-stylo-dark border-white/10 text-white placeholder:text-white/30 focus-visible:ring-stylo-gold focus-visible:border-stylo-gold"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-400 text-xs">{errors.title.message}</p>
          )}
        </div>

        {/* URL */}
        <div className="space-y-1.5">
          <Label htmlFor="url" className="text-white/70 text-sm">
            URL
          </Label>
          <Input
            id="url"
            type="url"
            placeholder="https://instagram.com/seunome"
            className="bg-stylo-dark border-white/10 text-white placeholder:text-white/30 focus-visible:ring-stylo-gold focus-visible:border-stylo-gold"
            {...register("url")}
          />
          {errors.url && (
            <p className="text-red-400 text-xs">{errors.url.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            disabled={isSaving}
            className="w-full btn-gold-glow bg-stylo-gold hover:bg-stylo-gold-hover text-black font-semibold h-11"
          >
            {isSaving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
            {isSaving ? "Adicionando..." : "Adicionar link"}
          </Button>
          <button
            type="button"
            onClick={() => router.push("/dashboard/links")}
            className="text-white/30 hover:text-white/60 text-sm transition-colors"
          >
            Pular por agora
          </button>
        </div>
      </form>
    </div>
  );
}
