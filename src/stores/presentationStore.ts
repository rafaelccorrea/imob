import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Presentation as PresentationType } from '../types';
import { mockPresentations } from '../utils/mockData';

interface PresentationState {
  presentations: PresentationType[];
  addPresentation: (presentation: PresentationType) => void;
  updatePresentation: (id: string, updates: Partial<PresentationType>) => void;
  deletePresentation: (id: string) => void;
  getPresentation: (id: string) => PresentationType | undefined;
}

export const usePresentationStore = create<PresentationState>()(
  persist(
    (set, get) => ({
      presentations: mockPresentations,
      addPresentation: (presentation: PresentationType) =>
        set((state) => ({
          presentations: [...state.presentations, presentation],
        })),
      updatePresentation: (id: string, updates: Partial<PresentationType>) =>
        set((state) => ({
          presentations: state.presentations.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      deletePresentation: (id: string) =>
        set((state) => ({
          presentations: state.presentations.filter((p) => p.id !== id),
        })),
      getPresentation: (id: string) => {
        const state = get();
        return state.presentations.find((p) => p.id === id);
      },
    }),
    {
      name: 'presentation-storage',
      partialize: (state) => ({
        presentations: state.presentations,
      }),
    }
  )
);
