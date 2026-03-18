"use client";

import { useState } from "react";
import { Users, Download, Trash2, Mail } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLeads } from "@/hooks/queries/useLeads";
import { creatorApi } from "@/lib/api";
import type { LeadDTO } from "@/types/api";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function exportCsv(leads: LeadDTO[]) {
  const allKeys = Array.from(new Set(leads.flatMap((l) => Object.keys(l.fields))));
  const header = ["E-mail", "Formulário", ...allKeys, "Capturado em"].join(",") + "\n";
  const rows = leads
    .map((l) => {
      const fieldValues = allKeys.map((k) => `"${(l.fields[k] ?? "").replace(/"/g, '""')}"`);
      return [`"${l.email}"`, `"${l.widgetTitle ?? ""}"`, ...fieldValues, `"${formatDate(l.capturedAt)}"`].join(",");
    })
    .join("\n");
  const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "leads_stylohub.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function LeadsPage() {
  const { data: leads, isLoading } = useLeads();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (leadId: string) => {
    setDeletingId(leadId);
    try {
      await creatorApi.deleteLead(leadId);
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead removido.");
    } catch {
      toast.error("Erro ao remover lead.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl space-y-5 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads</h1>
          <p className="text-white/40 text-sm mt-0.5">
            Contatos capturados pela sua página.
          </p>
        </div>
        <Button
          onClick={() => leads && exportCsv(leads)}
          disabled={!leads?.length}
          variant="outline"
          className="border-white/15 text-white/70 hover:text-white hover:border-white/30 bg-transparent"
        >
          <Download size={15} className="mr-2" />
          Exportar CSV
        </Button>
      </div>

      {/* Stats */}
      {leads && leads.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-stylo-surface border border-white/10 rounded-xl p-4">
            <p className="text-white/40 text-xs font-medium uppercase tracking-wide">Total</p>
            <p className="text-2xl font-bold text-white mt-1">{leads.length}</p>
          </div>
          <div className="bg-stylo-surface border border-white/10 rounded-xl p-4">
            <p className="text-white/40 text-xs font-medium uppercase tracking-wide">Último lead</p>
            <p className="text-sm font-semibold text-white mt-1 truncate">
              {leads[0]?.email ?? "—"}
            </p>
          </div>
        </div>
      )}

      {/* Table */}
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : !leads?.length ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-white/10 rounded-2xl">
          <Users size={40} className="text-white/20 mb-3" strokeWidth={1.5} />
          <p className="text-white/40 font-medium">Nenhum lead ainda</p>
          <p className="text-white/25 text-sm mt-1">
            Adicione um widget de formulário na sua página para capturar leads.
          </p>
        </div>
      ) : (
        <div className="bg-stylo-surface border border-white/10 rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/8 hover:bg-transparent">
                <TableHead className="text-white/50 font-semibold">
                  <Mail size={13} className="inline mr-1.5 opacity-70" />
                  E-mail
                </TableHead>
                <TableHead className="text-white/50 font-semibold">Formulário</TableHead>
                <TableHead className="text-white/50 font-semibold">Capturado em</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="border-white/5 hover:bg-white/3">
                  <TableCell className="text-white font-medium">{lead.email}</TableCell>
                  <TableCell>
                    {lead.widgetTitle ? (
                      <span className="text-xs bg-stylo-gold/10 text-stylo-gold border border-stylo-gold/20 px-2 py-0.5 rounded-full">
                        {lead.widgetTitle}
                      </span>
                    ) : (
                      <span className="text-white/30 text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-white/50 text-sm">
                    {formatDate(lead.capturedAt)}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      disabled={deletingId === lead.id}
                      className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-40"
                      title="Remover lead"
                    >
                      <Trash2 size={14} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
