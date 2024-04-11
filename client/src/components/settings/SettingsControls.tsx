import { LangControl } from "./LangControl";
import { MapModeControl } from "./MapModeControl";
import { MapStyleControl } from "./MapStyleControl";
import { ShowLandRuler } from "./ShowLandRuler";
import { TileLayerControl } from "./TileLayerControl";

export function SettingsControls() {
  return (
    <div className="h-full py-2 px-5">
      <div className="h-full flex flex-col justify-between gap-5">
        <MapModeControl />
        <MapStyleControl />
        <TileLayerControl />
        <LangControl />
        <ShowLandRuler />
      </div>
    </div>
  );
}
