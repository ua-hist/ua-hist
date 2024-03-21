import { createContext, useContext } from "react";
import { MapDisplayMode } from "./SettingsControls";

export type Settings = {
  mapMode: MapDisplayMode;
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
