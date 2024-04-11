import { useEffect, useRef } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { MarkerInfo } from "../../api/get-markers";
import cityIcon from "../../assets/fortress_icon.jpg";
import { useShowLabels } from "./use-show-labels";
import { useSettingsContext } from "../settings/SettingsContext";

const showLabelsZoomLimit = 5;

export function MarkerLayer({ markers }: { markers: MarkerInfo[] }) {
  const map = useMap();

  const { settings } = useSettingsContext();
  const layerRef = useRef<L.FeatureGroup>();

  const showLabels = useShowLabels(map, showLabelsZoomLimit);

  useEffect(() => {
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }

    const group = new L.FeatureGroup();
    layerRef.current = group;

    if (!settings.showLandRuler) {
      return;
    }
    markers.forEach((marker) => {
      const { pos, desc, label, icon } = marker;

      const markerIcon = L.icon({
        iconUrl: icon?.iconUrl || cityIcon,
        iconSize: icon?.iconSize || [15, 15],
        iconAnchor: icon?.iconAnchor || [0, 0],
        className: icon?.className,
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
  }, [map, markers, showLabels, settings.showLandRuler]);

  return <></>;
}
