"use client";

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, AtSign } from "lucide-react";
import { toast } from "sonner";

import { registerSchema, type RegisterFormValues } from "@/lib/validations";
import { authApi } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: searchParams.get("username") ?? "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true);
    try {
      const res = await authApi.register({
        email: values.email,
        password: values.password,
        username: values.username,
      });
      const { accessToken } = res.data;
      login(accessToken, { username: values.username, email: values.email });
      toast.success("Conta criada com sucesso!");
      router.push("/onboarding/profile");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Erro ao criar conta. Tente novamente.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stylo-dark flex items-center justify-center px-4 py-12">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-stylo-gold opacity-5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span
            className="text-3xl font-bold text-gold-gradient"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Stylohub
          </span>
          <p className="mt-2 text-white/50 text-sm">Comece gratuitamente hoje</p>
        </div>

        {/* Card */}
        <div className="bg-stylo-surface border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-xl font-semibold text-white mb-1">Criar sua conta</h1>
          <p className="text-white/50 text-sm mb-6">
            Já tem conta?{" "}
            <Link href="/auth/login" className="text-stylo-gold hover:underline">
              Entrar
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-white/70 text-sm">
                Nome de usuário
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stylo-gold">
                  <AtSign size={15} />
                </span>
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="seunome"
                  className="bg-stylo-dark border-white/10 text-white placeholder:text-white/30 focus-visible:ring-stylo-gold focus-visible:border-stylo-gold pl-8"
                  {...register("username")}
                />
              </div>
              {errors.username ? (
                <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
              ) : (
                <p className="text-white/30 text-xs">stylohub.io/seunome</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-white/70 text-sm">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                className="bg-stylo-dark border-white/10 text-white placeholder:text-white/30 focus-visible:ring-stylo-gold focus-visible:border-stylo-gold"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-white/70 text-sm">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Mínimo 8 caracteres"
                  className="bg-stylo-dark border-white/10 text-white placeholder:text-white/30 focus-visible:ring-stylo-gold focus-visible:border-stylo-gold pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full btn-gold-glow bg-stylo-gold hover:bg-stylo-gold-hover text-black font-semibold h-11"
            >
              {isLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
              {isLoading ? "Criando conta..." : "Criar conta grátis"}
            </Button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Ao criar uma conta, você concorda com nossos{" "}
          <Link href="/marketing/terms" className="hover:text-white/60 underline">
            Termos de Uso
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
