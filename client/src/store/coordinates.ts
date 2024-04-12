import { create } from "zustand";

type CoordinatesState = {
  coordinates: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
  setCoordinates: (coordinates: { lat: number; lng: number }) => void;
  reset: () => void;
  setIsActive: (isActive: boolean) => void;
};

export const useCoordinatesStore = create<CoordinatesState>((set) => ({
  coordinates: {
    lat: 0,
    lng: 0,
  },
  isActive: false,
  setCoordinates: (coordinates) =>
    set((state) => ({ ...state, coordinates, isActive: false })),
  reset: () =>
    set((state) => ({
      ...state,
      isActive: false,
      coordinates: { lat: 0, lng: 0 },
    })),
  setIsActive: (isActive) => {
    if (isActive == false) {
      set((state) => ({
        ...state,
        coordinates: { lat: 0, lng: 0 },
      }));
    } else {
      set((state) => ({ ...state, isActive }));
    }
  },
}));
