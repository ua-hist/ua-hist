import { Feature } from "geojson";
import * as turf from "@turf/turf";

export const getIntersectingShapes = (
  baseShape: Feature<any>,
  features: Feature<any>[]
) => {
  return features.filter((feature) => turf.intersect(feature, baseShape));
};
