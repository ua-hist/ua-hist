import { useEffect } from "react";
import { useMap, useMapEvent } from "react-leaflet";
import { StorageHelper } from "../../utils/storage";
import { useCoordinatesStore } from "../../store/coordinates";

export function MapEventsLayer() {
  const map = useMap();
  const setCoordinates = useCoordinatesStore((state) => state.setCoordinates);

  useMapEvent("click", (e) => {
    setCoordinates({
      x: e.containerPoint.x,
      y: e.containerPoint.y,
    });
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
