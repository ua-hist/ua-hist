import { Feature, MultiPolygon } from "geojson";
import { PathOptions } from "leaflet";
import { getColor } from "../../data/colors";

export type MapStyleFn = (feature: Feature<MultiPolygon>) => PathOptions;

export const defaultStyle: MapStyleFn = (f) => {
  const color = getColor(f.properties!["NAME"]) || "grey";

  return {
    fillColor: color,
    fillOpacity: 0.3,
    color: color,
    weight: 3,
  };
};

export const mapStyles: { id: string; styleFn: MapStyleFn; title: string }[] = [
  {
    id: "Archaic",
    title: "Archaic",
    styleFn: (f) => {
      const color = getColor(f.properties!["NAME"]) || "grey";

      return {
        fillColor: color,
        fillOpacity: 0.3,
        color: color,
        weight: 3,
      };
    },
  },
  {
    id: "Modern",
    title: "Modern",
    styleFn: (f) => {
      const color = getColor(f.properties!["NAME"]) || "grey";

      return {
        fillColor: color,
        fillOpacity: 0.4,
        color: "#000",
        weight: 1,
      };
    },
  },
];
