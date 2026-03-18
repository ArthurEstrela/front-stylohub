"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { publicApi } from "@/lib/api";
import type { Widget } from "@/types/widget";

interface Props {
  widget: Widget;
  username: string;
}

export function LeadFormWidget({ widget, username }: Props) {
  const { config } = widget;
  const formFields: string[] = config.formFields?.length ? config.formFields : ["email"];
  const buttonLabel = config.buttonLabel ?? "Enviar";
  const successMessage = config.successMessage ?? "Obrigado! Entraremos em contato em breve.";
  const title = config.title;

  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(formFields.map((f) => [f, ""]))
  );
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Require at least the email-like field
    const emailField = formFields.find((f) =>
      f.toLowerCase().includes("email") || f.toLowerCase().includes("e-mail")
    );
    if (emailField && !values[emailField]?.trim()) {
      setError("Por favor, preencha o e-mail.");
      return;
    }

    setLoading(true);
    try {
      await publicApi.submitLead(username, widget.id, values);
      setSubmitted(true);
    } catch {
      setError("Erro ao enviar formulário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="w-full rounded-2xl p-5 flex flex-col items-center gap-2 text-center"
        style={{
          background: "var(--profile-btn-bg, rgba(255,255,255,0.08))",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <CheckCircle2 size={32} style={{ color: "var(--profile-primary)" }} />
        <p className="text-sm font-medium" style={{ color: "var(--profile-text)" }}>
          {successMessage}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl p-4 space-y-3"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {title && (
        <p className="text-sm font-semibold text-center" style={{ color: "var(--profile-text)" }}>
          {title}
        </p>
      )}

      {formFields.map((field) => (
        <input
          key={field}
          type={field.toLowerCase().includes("email") || field.toLowerCase().includes("e-mail") ? "email" : "text"}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={values[field] ?? ""}
          onChange={(e) => setValues((prev) => ({ ...prev, [field]: e.target.value }))}
          required={field.toLowerCase().includes("email") || field.toLowerCase().includes("e-mail")}
          className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "var(--profile-text)",
          }}
        />
      ))}

      {error && (
        <p className="text-xs text-red-400 text-center">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl py-2.5 text-sm font-semibold transition-opacity disabled:opacity-60"
        style={{
          background: "var(--profile-primary)",
          color: "var(--profile-bg)",
          boxShadow: "var(--profile-btn-shadow, none)",
        }}
      >
        {loading ? "Enviando..." : buttonLabel}
      </button>
    </form>
  );
}
