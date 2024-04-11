import { useEffect } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { StorageHelper } from "../../utils/storage";

export function MapEventsLayer() {
  const map = useMap();

  useMapEvent("click", (e) => {
    console.log(e.latlng);
  });

  useEffect(() => {
    map.on("zoomend", () => {
      StorageHelper.set("zoom", map.getZoom());
    });

    map.on("moveend", () => {
      StorageHelper.set("center", map.getCenter());
    });

    return () => {
      map.off("zoomend");
      map.off("moveend");
    };
  }, [map]);

  return <></>;
}
