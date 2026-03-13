import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { creatorApi } from "@/lib/api";
import type { Profile } from "@/types/profile";

export function useReorderWidgets() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderedWidgetIds: string[]) =>
      creatorApi.reorderWidgets(orderedWidgetIds),
    onMutate: async (orderedWidgetIds) => {
      await queryClient.cancelQueries({ queryKey: ["profile"] });
      const previous = queryClient.getQueryData<Profile>(["profile"]);
      if (previous) {
        const widgetMap = new Map(previous.widgets.map((w) => [w.id, w]));
        const reordered = orderedWidgetIds
          .map((id, i) => {
            const w = widgetMap.get(id);
            return w ? { ...w, orderIndex: i } : null;
          })
          .filter(Boolean);
        queryClient.setQueryData(["profile"], {
          ...previous,
          widgets: reordered,
        });
      }
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(["profile"], ctx.previous);
      toast.error("Erro ao reordenar links.");
    },
    onSuccess: (res) => {
      queryClient.setQueryData(["profile"], res.data);
    },
  });
}
