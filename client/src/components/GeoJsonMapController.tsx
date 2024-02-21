import { Feature } from "geojson";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

export const MapController = ({ features }: { features: Feature<any>[] }) => {
  const map = useMap();

  const layerRef = useRef<L.Layer>();

  useEffect(() => {
    const colors = ["blue", "red", "green"];

    const getColor = (i: number) => colors[i % colors.length];

    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }

    const group = new L.FeatureGroup();
    layerRef.current = group;

    features.forEach((f, i) => {
      group.addLayer(
        L.geoJSON(f, {
          style: {
            fillColor: getColor(i),
            color: getColor(i),
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
