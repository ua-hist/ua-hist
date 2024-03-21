import { MapModeControl } from "./MapModeControl";
import { TileLayerControl } from "./TileLayerControl";

export function SettingsControls() {
  return (
    <div className="h-full py-2 px-5">
      <div className="h-full flex flex-col justify-between">
        <MapModeControl />
        <TileLayerControl />
      </div>
    </div>
  );
}
