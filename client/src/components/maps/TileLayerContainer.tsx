import { TileLayer } from "react-leaflet";
import { tileLayers } from "../settings/tile-layers";
import { useSettingsContext } from "../settings/SettingsContext";

export function TileLayerContainer() {
  const {
    settings: { tileLayerId },
  } = useSettingsContext();

  const tileLayer = tileLayers[tileLayerId];

  return (
    <>
      {tileLayer && (
        <TileLayer url={tileLayer.url} attribution={tileLayer.attribution} />
      )}
    </>
  );
}
