import { MapContainer } from "react-leaflet";
import "./MapSection.scss";
import { Feature, MultiPolygon } from "geojson";
import { useEffect, useMemo, useState } from "react";
import { getMaps } from "../api/get-maps";
import { GeoJsonLayer } from "./GeoJsonLayer";
import { TileLayerContainer } from "./TileLayerContainer";
import L from "leaflet";
import { MapDisplayMode } from "../App";
import { getIntersectingShapes } from "../utils/get-intersecting-shapes";
import { uaBounds } from "../data/uabounds";
import { MapEventsLayer } from "./MapEventsLayer";
import { StorageHelper } from "../utils/storage";

export function MapSection(props: { date: number; mapMode: MapDisplayMode }) {
  const { date, mapMode } = props;

  const [features, setFeatures] = useState<Feature<MultiPolygon>[]>([]);

  useEffect(() => {
    getMaps(date).then(setFeatures);
  }, [date]);

  const filteredFeats = useMemo(() => {
    if (mapMode === "ukraine") {
      return getIntersectingShapes(uaBounds, features);
    }

    return features;
  }, [mapMode, features]);

  const corner1 = L.latLng(-90, -200);
  const corner2 = L.latLng(90, 200);
  const bounds = L.latLngBounds(corner1, corner2);

  return (
    <div style={{ height: "100vh" }}>
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={StorageHelper.get("center", [50.4504, 30.5245])}
        zoom={StorageHelper.get("zoom", 5)}
        scrollWheelZoom={true}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        minZoom={3}
      >
        <TileLayerContainer />
        <GeoJsonLayer features={filteredFeats} />
        <MapEventsLayer />
      </MapContainer>
    </div>
  );
}
