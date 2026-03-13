"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { useAuth } from "@/providers/AuthProvider";
import { useProfile } from "@/hooks/queries/useProfile";
import { usePreviewStore } from "@/store/usePreviewStore";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { LivePreviewMobile } from "@/components/dashboard/LivePreviewMobile";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { token, user, isLoading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const setProfile = usePreviewStore((s) => s.setProfile);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !token) {
      router.replace("/auth/login");
    }
  }, [authLoading, token, router]);

  // Sync profile to preview store
  useEffect(() => {
    if (profile) {
      setProfile(profile);
    }
  }, [profile, setProfile]);

  if (authLoading || (!token && !authLoading)) {
    return (
      <div className="min-h-screen bg-stylo-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stylo-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stylo-dark flex">
      {/* Sidebar */}
      <div className="hidden md:flex h-screen sticky top-0">
        <Sidebar
          plan={profile?.plan ?? "FREE"}
          username={user?.username ?? profile?.username ?? ""}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex min-w-0">
        {/* Content area */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {profileLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="w-6 h-6 border-2 border-stylo-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            children
          )}
        </main>

        {/* Live preview — hidden on mobile and small tablets */}
        <div className="hidden xl:flex flex-col items-center justify-start pt-12 px-8 border-l border-white/5 sticky top-0 h-screen overflow-y-auto">
          <LivePreviewMobile />
        </div>
      </div>
    </div>
  );
}
