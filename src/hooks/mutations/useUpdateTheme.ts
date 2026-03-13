import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { creatorApi } from "@/lib/api";
import type { UpdateThemeRequest } from "@/types/profile";

export function useUpdateTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateThemeRequest) => creatorApi.updateTheme(data),
    onSuccess: (res) => {
      queryClient.setQueryData(["profile"], res.data);
      toast.success("Tema atualizado!");
    },
    onError: () => {
      toast.error("Erro ao salvar tema. Tente novamente.");
    },
  });
}
