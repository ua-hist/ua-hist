import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSettingsContext } from "./SettingsContext";
import { mapStyles } from "./map-styles";

export function MapStyleControl() {
  const { settings, setSetting } = useSettingsContext();

  const selectedMapStyle = mapStyles.find((s) => s.id === settings.mapStyleId);

  if (!selectedMapStyle) {
    return;
  }

  return (
    <div className="flex flex-row justify-between align-center">
      <div className="flex flex-row justify-center items-center">
        <div className="font-medium">Map style</div>
      </div>

      <Select
        defaultValue={selectedMapStyle.id}
        onValueChange={(v) => setSetting("mapStyleId", v)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {mapStyles.map((mapStyle) => (
            <SelectItem key={mapStyle.id} value={mapStyle.id}>
              {mapStyle.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
