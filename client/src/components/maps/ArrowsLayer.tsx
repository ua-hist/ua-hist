import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

import { ArrowheadOptions } from "leaflet-arrowheads";
import { CampaignInfo } from "../../api/get-campaigns";
import { useTranslation } from "react-i18next";
import { useSettingsContext } from "../settings/SettingsContext";
import { useShowLabels } from "./use-show-labels";

const showLabelsZoomLimit = 4;

export function ArrowsLayer({ campaigns }: { campaigns: CampaignInfo[] }) {
  const map = useMap();
  const { settings } = useSettingsContext();
  const { i18n } = useTranslation();
  const showLabels = useShowLabels(map, showLabelsZoomLimit);

  const layerRef = useRef<L.FeatureGroup>();

  useEffect(() => {
    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }

    const group = new L.FeatureGroup();
    layerRef.current = group;

    campaigns.forEach((campaignInfo) => {
      const arrowOptions: ArrowheadOptions = {
        frequency: "allvertices",
        size: "10px",
      };

      const campaignLayer = L.geoJSON(campaignInfo.path, {
        style: {
          color: "red",
          weight: 3,
        },
        //@ts-ignore
        arrowheads: arrowOptions,
      });
      group.addLayer(campaignLayer);
    });

    map.addLayer(group);
  }, [map, campaigns, i18n.language, showLabels, settings.mapStyleId]);

  return <></>;
}
