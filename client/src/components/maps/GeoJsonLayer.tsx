import { Feature, MultiPolygon } from "geojson";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { useSettingsContext } from "../settings/SettingsContext";
import { MapStyleFn, defaultStyle, mapStyles } from "../settings/map-styles";
import { useTranslation } from "react-i18next";
import { namesUa } from "../../data/names.ua";

export const GeoJsonLayer = ({
  features,
}: {
  features: Feature<MultiPolygon>[];
}) => {
  const map = useMap();
  const { settings } = useSettingsContext();
  const { i18n } = useTranslation();

  const layerRef = useRef<L.FeatureGroup>();

  function renderFeature(f: Feature<MultiPolygon>, mapStyleFn?: MapStyleFn) {
    return L.geoJSON(f, {
      style: mapStyleFn?.(f) || defaultStyle(f),
      onEachFeature: function (feature, layer) {
        const name = feature.properties["NAME"];

        if (!name) {
          return;
        }

        const translatedName =
          i18n.language === "ua" ? namesUa[name] || "" : name;

        layer.bindTooltip(translatedName, {
          permanent: true,
          direction: "center",
          className: "territory_tooltip",
        });
      },
    });
  }

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
      group.addLayer(renderFeature(f, mapStyleFn));
      map.addLayer(group);
    });
  }, [features, map, settings.mapStyleId, i18n.language]);

  return <></>;
};
