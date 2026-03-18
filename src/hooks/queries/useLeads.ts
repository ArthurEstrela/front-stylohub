import { useQuery } from "@tanstack/react-query";
import { creatorApi } from "@/lib/api";
import type { LeadDTO } from "@/types/api";

export function useLeads() {
  return useQuery<LeadDTO[]>({
    queryKey: ["leads"],
    queryFn: async () => {
      const res = await creatorApi.getLeads();
      return res.data;
    },
  });
}
