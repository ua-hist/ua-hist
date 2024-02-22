import { Feature } from "geojson";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { colors } from "../../data/colors";

export const MapController = ({ features }: { features: Feature<any>[] }) => {
  const map = useMap();

  const layerRef = useRef<L.Layer>();

  useEffect(() => {
    const getColor = (name: string) => colors[name];

    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }

    const group = new L.FeatureGroup();
    layerRef.current = group;

    features.forEach((f) => {
      const color = getColor(f.properties!["NAME"]) || "grey";

      group.addLayer(
        L.geoJSON(f, {
          style: {
            fillColor: color,
            color: color,
          },
          onEachFeature: function (feature, layer) {
            const name = feature.properties["NAME"];

            if (!name) {
              return;
            }

            layer.bindTooltip(feature.properties["NAME"], {
              permanent: true,
              direction: "center",
              className: "territory_tooltip",
            });
          },
        })
      );
      map.addLayer(group);
    });
  }, [features, map]);

  return <></>;
};
