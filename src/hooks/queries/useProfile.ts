import { useQuery } from "@tanstack/react-query";
import { creatorApi } from "@/lib/api";
import type { Profile } from "@/types/profile";

export function useProfile() {
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await creatorApi.getProfile();
      return res.data;
    },
  });
}
