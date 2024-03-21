import { createContext, useContext } from "react";
import { MapDisplayMode } from "./MapModeControl";

export type Settings = {
  mapMode: MapDisplayMode;
  tileLayerId: number;
  mapStyleId: string;
};

export type SettingsContextType = {
  settings: Settings;
  setSettings: (v: Settings) => void;
  setSetting: <K extends keyof Settings>(k: K, v: Settings[K]) => void;
};

export const SettingsContext = createContext<SettingsContextType>(
  {} as SettingsContextType,
);

export const useSettingsContext = () => useContext(SettingsContext);
