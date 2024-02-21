import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "./MapSection.scss";
import { Feature } from "geojson";
import { useRef, useEffect, useMemo } from "react";
import { feature } from "turf";

const colors = ["blue", "red", "green"];

const getColor = (i: number) => colors[i % colors.length];

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

export function MapSection(props: { features: Feature<any>[] }) {
  const tileLayer = tileLayers[0];
  const { features } = props;

  const geoJsonRef = useRef<any>();

  const geojson = useMemo(
    () =>
      ({
        type: "FeatureCollection",
        features: features,
      }) as const,
    [features]
  );

  // set the data to new data whenever it changes
  useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current.clearLayers(); // remove old data
      geoJsonRef.current.addData(geojson); // might need to be geojson.features
    }
  }, [geoJsonRef, geojson]);

  return (
    <div className="map_wrapper" style={{ height: "100vh" }}>
      <MapContainer
        style={{ height: "100vh" }}
        center={[50.4504, 30.5245]}
        zoom={6}
        scrollWheelZoom={true}
      >
        {tileLayer && (
          <TileLayer url={tileLayer.url} attribution={tileLayer.attribution} />
        )}
        {
          <GeoJSON
            ref={geoJsonRef}
            data={geojson}
            onEachFeature={function (feature, layer) {
              const name = feature.properties["NAME"];

              if (!name) {
                return;
              }

              layer.bindTooltip(feature.properties["NAME"], {
                permanent: true,
                direction: "center",
                className: "territory_tooltip",
              });
            }}
            // style={{
            //   fillColor: getColor(i),
            //   color: getColor(i),
            // }}
          />
        }
      </MapContainer>
    </div>
  );
}
