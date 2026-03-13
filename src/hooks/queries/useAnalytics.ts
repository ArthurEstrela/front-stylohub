import { useQuery } from "@tanstack/react-query";
import { creatorApi } from "@/lib/api";
import type { DashboardStatsDTO } from "@/types/api";

export function useAnalytics() {
  return useQuery<DashboardStatsDTO>({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await creatorApi.getAnalytics();
      return res.data;
    },
  });
}
