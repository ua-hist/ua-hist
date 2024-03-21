import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSettingsContext } from "./SettingsContext";

const mapModes = ["europe", "ukraine"] as const;

export type MapDisplayMode = (typeof mapModes)[number];

const mapModesDict: Record<MapDisplayMode, string> = {
  europe: "Europe",
  ukraine: "Ukraine and neigbors",
};

export function SettingsControls() {
  const { settings, setSetting } = useSettingsContext();

  return (
    <div className="sidebar_top py-2 px-5">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between align-center">
          <div className="flex flex-row justify-center items-center">
            <div className="font-medium">Map scope</div>
          </div>

          <Select
            defaultValue={settings.mapMode}
            onValueChange={(v: MapDisplayMode) => setSetting("mapMode", v)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {mapModes.map((mode) => (
                <SelectItem key={mode} value={mode}>
                  {mapModesDict[mode]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
