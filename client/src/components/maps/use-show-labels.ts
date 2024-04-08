import L from "leaflet";
import { useState, useEffect } from "react";
import { StorageHelper } from "../../utils/storage";

export function useShowLabels(
  map: L.Map,
  showLabelsZoomLimit: number,
): boolean {
  const [showLabels, setShowLabels] = useState(
    StorageHelper.get("zoom", 5) > showLabelsZoomLimit,
  );

  useEffect(() => {
    map.on("zoomend", () => {
      const newShowLabels = map.getZoom() > showLabelsZoomLimit;
      setShowLabels(newShowLabels);
    });

    return () => {
      map.off("zoomend");
    };
  }, [map, showLabelsZoomLimit]);

  return showLabels;
}
