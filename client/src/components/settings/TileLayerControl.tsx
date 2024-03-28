import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSettingsContext } from "./SettingsContext";
import { tileLayers } from "./tile-layers";

export function TileLayerControl() {
  const { t } = useTranslation();
  const { settings, setSetting } = useSettingsContext();

  return (
    <div className="flex flex-row justify-between align-center">
      <div className="flex flex-row justify-center items-center">
        <div className="font-medium">{t('mapBackground')}</div>
      </div>

      <Select
        defaultValue={`${settings.tileLayerId}`}
        onValueChange={(v) => setSetting("tileLayerId", parseInt(v))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {tileLayers.map((tileLayer, i) => (
            <SelectItem key={tileLayer.url} value={`${i}`}>
               {t(`mapBackgrounds.${tileLayer.title}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
