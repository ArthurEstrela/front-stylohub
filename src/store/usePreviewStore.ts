import { create } from "zustand";
import type { Profile, Theme } from "@/types/profile";
import type { Widget } from "@/types/widget";

interface PreviewState {
  profile: Profile | null;
  isDirty: boolean;
  setProfile: (profile: Profile) => void;
  updateTheme: (theme: Partial<Theme>) => void;
  updateWidget: (widgetId: string, config: Partial<Widget["config"]>) => void;
  addWidget: (widget: Widget) => void;
  removeWidget: (widgetId: string) => void;
  toggleWidget: (widgetId: string) => void;
  reorderWidgets: (orderedIds: string[]) => void;
  setDirty: (dirty: boolean) => void;
}

export const usePreviewStore = create<PreviewState>((set) => ({
  profile: null,
  isDirty: false,

  setProfile: (profile) => set({ profile, isDirty: false }),

  updateTheme: (themeUpdate) =>
    set((state) => {
      if (!state.profile) return state;
      return {
        profile: {
          ...state.profile,
          theme: { ...state.profile.theme, ...themeUpdate },
        },
        isDirty: true,
      };
    }),

  updateWidget: (widgetId, configUpdate) =>
    set((state) => {
      if (!state.profile) return state;
      return {
        profile: {
          ...state.profile,
          widgets: state.profile.widgets.map((w) =>
            w.id === widgetId
              ? { ...w, config: { ...w.config, ...configUpdate } }
              : w
          ),
        },
        isDirty: true,
      };
    }),

  addWidget: (widget) =>
    set((state) => {
      if (!state.profile) return state;
      return {
        profile: {
          ...state.profile,
          widgets: [...state.profile.widgets, widget],
        },
        isDirty: true,
      };
    }),

  removeWidget: (widgetId) =>
    set((state) => {
      if (!state.profile) return state;
      return {
        profile: {
          ...state.profile,
          widgets: state.profile.widgets.filter((w) => w.id !== widgetId),
        },
        isDirty: true,
      };
    }),

  toggleWidget: (widgetId) =>
    set((state) => {
      if (!state.profile) return state;
      return {
        profile: {
          ...state.profile,
          widgets: state.profile.widgets.map((w) =>
            w.id === widgetId ? { ...w, isActive: !w.isActive } : w
          ),
        },
        isDirty: true,
      };
    }),

  reorderWidgets: (orderedIds) =>
    set((state) => {
      if (!state.profile) return state;
      const widgetMap = new Map(state.profile.widgets.map((w) => [w.id, w]));
      const reordered = orderedIds
        .map((id, index) => {
          const w = widgetMap.get(id);
          return w ? { ...w, orderIndex: index } : null;
        })
        .filter(Boolean) as Widget[];
      return {
        profile: { ...state.profile, widgets: reordered },
        isDirty: true,
      };
    }),

  setDirty: (dirty) => set({ isDirty: dirty }),
}));
