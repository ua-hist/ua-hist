import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { MarkerInfo } from "../../api/get-markers";
import cityIcon from "../../assets/city_icon.png";
import { StorageHelper } from "../../utils/storage";

export function MarkerLayer({ markers }: { markers: MarkerInfo[] }) {
  const map = useMap();

  const [showLabels, setShowLabels] = useState(
    StorageHelper.get("zoom", 5) > 5,
  );

  const layerRef = useRef<L.FeatureGroup>();

  useEffect(() => {
    map.on("zoomend", () => {
      console.log(map.getZoom());
      const newShowLabels = map.getZoom() > 5;
      setShowLabels(newShowLabels);
    });

    return () => {
      map.off("zoomend");
    };
  }, [map]);

  useEffect(() => {
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }

    const group = new L.FeatureGroup();
    layerRef.current = group;

    markers.forEach((marker) => {
      const { pos, desc, label, icon } = marker;

      const markerIcon = L.icon({
        iconUrl: icon?.iconUrl || cityIcon,
        iconSize: icon?.iconSize || [15, 15],
        iconAnchor: icon?.iconAnchor || [0, 0],
      });

      const leafletMarker = L.marker(pos, { icon: markerIcon });

      if (desc) {
        leafletMarker.bindPopup(desc);
      }

      if (label && showLabels) {
        leafletMarker.bindTooltip(label, {
          className: "leaflet_tooltip",
          direction: "right",
          offset: [5, 8],
          opacity: 1,
          permanent: true,
        });
      }

      group.addLayer(leafletMarker);
      map.addLayer(group);
    });
  }, [map, markers, showLabels]);

  return <></>;
}
