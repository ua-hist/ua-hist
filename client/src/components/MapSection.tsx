import { MapContainer } from "react-leaflet";
import "./MapSection.scss";
import { Feature } from "geojson";
import { useEffect, useState } from "react";
import { getMaps } from "../api/get-maps";
import { MapController } from "./GeoJsonMapController";
import { TileLayerContainer } from "./TileLayerContainer";

export function MapSection(props: { date: number }) {
  const { date } = props;

  const [features, setFeatures] = useState<Feature<any>[]>([]);

  useEffect(() => {
    getMaps(date).then(setFeatures);
  }, [date]);

  return (
    <div className="map_wrapper" style={{ height: "100vh" }}>
      <MapContainer
        style={{ height: "100vh" }}
        center={[50.4504, 30.5245]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayerContainer />
        <MapController features={features} />
      </MapContainer>
    </div>
  );
}
