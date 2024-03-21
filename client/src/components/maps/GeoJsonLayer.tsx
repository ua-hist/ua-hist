import { Feature, MultiPolygon } from "geojson";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { getColor } from "../../data/colors";
import { useSettingsContext } from "../settings/SettingsContext";
import { mapStyles } from "../settings/map-styles";

export const GeoJsonLayer = ({
  features,
}: {
  features: Feature<MultiPolygon>[];
}) => {
  const map = useMap();
  const { settings } = useSettingsContext();

  const layerRef = useRef<L.Layer>();

  useEffect(() => {
    const mapStyleFn = mapStyles.find(
      (s) => s.id === settings.mapStyleId,
    )?.styleFn;

    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }

    const group = new L.FeatureGroup();
    layerRef.current = group;

    features.forEach((f) => {
      const color = getColor(f.properties!["NAME"]) || "grey";

      group.addLayer(
        L.geoJSON(f, {
          style: mapStyleFn?.(f) || {
            fillColor: color,
            fillOpacity: 0.3,
            color: color,
            weight: 3,
          },
          onEachFeature: function (feature, layer) {
            const name = feature.properties["NAME"];

            if (!name) {
              return;
            }

            layer.bindTooltip(name, {
              permanent: true,
              direction: "center",
              className: "territory_tooltip",
            });
          },
        }),
      );
      map.addLayer(group);
    });
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });

    resizeObserver.observe(map.getContainer());

    return () => {
      resizeObserver.disconnect();
    };
  }, [features, map, settings.mapStyleId]);

  return <></>;
};
