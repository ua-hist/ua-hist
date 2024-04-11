import { create } from "zustand";

type CoordinatesState = {
  coordinates: {
    x: number;
    y: number;
  };
  setCoordinates: (coordinates: { x: number; y: number }) => void;
};

export const useCoordinatesStore = create<CoordinatesState>((set) => ({
  coordinates: {
    x: 0,
    y: 0,
  },
  setCoordinates: (coordinates) => set((state) => ({ ...state, coordinates })),
}));
