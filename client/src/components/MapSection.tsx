import { MapContainer } from "react-leaflet";
import "./MapSection.scss";
import { Feature } from "geojson";
import { useEffect, useState } from "react";
import { getMaps } from "../api/get-maps";
import { GeoJsonLayer } from "./GeoJsonLayer";
import { TileLayerContainer } from "./TileLayerContainer";
import L from "leaflet";

export function MapSection(props: { date: number }) {
  const { date } = props;

  const [features, setFeatures] = useState<Feature<any>[]>([]);

  useEffect(() => {
    getMaps(date).then(setFeatures);
  }, [date]);

  const corner1 = L.latLng(-90, -200);
  const corner2 = L.latLng(90, 200);
  const bounds = L.latLngBounds(corner1, corner2);

  return (
    <div className="map_wrapper" style={{ height: "100vh" }}>
      <MapContainer
        style={{ height: "100vh" }}
        center={[50.4504, 30.5245]}
        zoom={5}
        scrollWheelZoom={true}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        minZoom={3}
      >
        <TileLayerContainer />
        <GeoJsonLayer features={features} />
      </MapContainer>
    </div>
  );
}
