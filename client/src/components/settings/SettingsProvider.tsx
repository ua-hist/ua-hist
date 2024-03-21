import { PropsWithChildren, useState } from "react";
import { Settings, SettingsContext } from "./SettingsContext";
import { StorageHelper } from "../../utils/storage";

export function SettingsProvider(props: PropsWithChildren) {
  const [settings, setSettings_] = useState<Settings>(
    StorageHelper.get<Settings>("settings", {
      mapMode: "ukraine",
    }),
  );

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
