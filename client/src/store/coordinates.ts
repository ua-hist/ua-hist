import { create } from "zustand";

type CoordinatesState = {
  coordinates: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
  setCoordinates: (coordinates: { lat: number; lng: number }) => void;
  reset: () => void;
  activate: () => void;
};

export const useCoordinatesStore = create<CoordinatesState>((set) => ({
  coordinates: {
    lat: 0,
    lng: 0,
  },
  isActive: true,
  setCoordinates: (coordinates) => set((state) => ({ ...state, coordinates })),
  reset: () =>
    set((state) => ({
      ...state,
      isActive: false,
      coordinates: { lat: 0, lng: 0 },
    })),
  activate: () => set((state) => ({ ...state, isActive: true })),
}));
