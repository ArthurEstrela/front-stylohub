import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { creatorApi } from "@/lib/api";
import type { Profile, UpdateThemeRequest } from "@/types/profile";

export function useUpdateTheme() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateThemeRequest) => creatorApi.updateTheme(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["profile"] });
      const previous = queryClient.getQueryData<Profile>(["profile"]);
      if (previous) {
        queryClient.setQueryData<Profile>(["profile"], {
          ...previous,
          theme: { ...previous.theme, ...data },
        });
      }
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(["profile"], ctx.previous);
      toast.error("Erro ao salvar tema. Tente novamente.");
    },
    onSuccess: (res) => {
      queryClient.setQueryData(["profile"], res.data);
      toast.success("Tema atualizado!");
    },
  });
}
