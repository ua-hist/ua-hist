import { MapContainer } from "react-leaflet";
import "./MapSection.scss";
import { Feature, MultiPolygon } from "geojson";
import { useEffect, useMemo, useState } from "react";
import { getMaps } from "../../api/get-maps";
import { GeoJsonLayer } from "./GeoJsonLayer";
import { TileLayerContainer } from "./TileLayerContainer";
import L from "leaflet";
import { getIntersectingShapes } from "../../utils/get-intersecting-shapes";
import { uaBounds } from "../../data/uabounds";
import { MapEventsLayer } from "./MapEventsLayer";
import { StorageHelper } from "../../utils/storage";
import { useSettingsContext } from "../settings/SettingsContext";
import { useDateContext } from "../date/DateContext";
import { MarkerInfo, getMarkers } from "../../api/get-markers";
import { MarkerLayer } from "./MarkerLayer";
import { ArrowsLayer } from "./ArrowsLayer";
import { CampaignInfo, getCampaigns } from "../../api/get-campaigns";

export function MapSection() {
  const { date } = useDateContext();

  const { settings } = useSettingsContext();

  const [features, setFeatures] = useState<Feature<MultiPolygon>[]>([]);
  const [markers, setMarkers] = useState<MarkerInfo[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignInfo[]>([]);

  useEffect(() => {
    Promise.all([getMaps(date), getMarkers(date), getCampaigns(date)]).then(
      ([dMaps, dMarkers, dCampaigns]) => {
        setFeatures(dMaps);
        setMarkers(dMarkers);
        setCampaigns(dCampaigns);
      },
    );
  }, [date]);

  const filteredFeats = useMemo(() => {
    if (settings.mapMode === "ukraine") {
      return getIntersectingShapes(uaBounds, features);
    }

    return features;
  }, [settings.mapMode, features]);

  return (
    <MapContainer
      className="h-full z-0"
      center={StorageHelper.get("center", [50.4504, 30.5245])}
      zoom={StorageHelper.get("zoom", 5)}
      scrollWheelZoom={true}
      maxBounds={L.latLngBounds(L.latLng(-90, -200), L.latLng(90, 200))}
      maxBoundsViscosity={1.0}
      minZoom={3}
    >
      <TileLayerContainer />
      <GeoJsonLayer features={filteredFeats} />
      <MarkerLayer markers={markers} />
      <MapEventsLayer />
      <ArrowsLayer campaigns={campaigns} />
    </MapContainer>
  );
}
