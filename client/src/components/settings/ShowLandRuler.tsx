import { useTranslation } from "react-i18next";
import { useSettingsContext } from "./SettingsContext";
import { Switch } from "../ui/switch";

export function ShowLandRuler() {
  const { t } = useTranslation();
  const { settings, setSetting } = useSettingsContext();

  return (
    <div className="flex flex-row justify-between align-center">
      <div className="flex flex-row justify-center items-center">
        <div className="font-medium">{t("showLandRuler")}</div>
      </div>
      <Switch
        defaultChecked={settings.showLandRuler}
        onCheckedChange={(v) => setSetting("showLandRuler", v)}
        checked={settings.showLandRuler}
      />
    </div>
  );
}
