import { PropsWithChildren, useState } from "react";
import { Settings, SettingsContext } from "./SettingsContext";
import { StorageHelper } from "../../utils/storage";

export function SettingsProvider(props: PropsWithChildren) {
  function getInitValue() {
    const defaultValues: Settings = {
      mapMode: "ukraine",
      tileLayerId: 0,
      mapStyleId: "Archaic",
      locale: "en",
    };
    const savedValue = StorageHelper.get<Settings>("settings", defaultValues);

    Object.keys(defaultValues).forEach((k) => {
      const key = k as keyof Settings;
      const saved = savedValue as Record<string, any>;

      if (saved[key] === undefined) {
        saved[key] = defaultValues[key];
      }
    });

    return savedValue;
  }

  const [settings, setSettings_] = useState<Settings>(() => getInitValue());

  const setSettings = (v: Settings) => {
    StorageHelper.set("settings", v);
    setSettings_(v);
  };

  const setSetting = <K extends keyof Settings>(k: K, v: Settings[K]) => {
    setSettings({ ...settings, [k]: v });
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings, setSetting }}>
      {props.children}
    </SettingsContext.Provider>
  );
}
