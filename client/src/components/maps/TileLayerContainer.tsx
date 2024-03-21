import { TileLayer } from "react-leaflet";

export function TileLayerContainer() {
  const tileLayers: { url: string; attribution: string }[] = [
    {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
      attribution:
        "Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS",
    },
  ];

  const tileLayer = tileLayers[0];

  return (
    <>
      {tileLayer && (
        <TileLayer url={tileLayer.url} attribution={tileLayer.attribution} />
      )}
    </>
  );
}
