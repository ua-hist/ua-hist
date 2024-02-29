import { Feature, FeatureCollection, MultiPolygon } from "geojson";
import { apiUrl } from "./get-events";

export function getMaps(year: number): Promise<Feature<MultiPolygon>[]> {
  return fetch(apiUrl + "/maps/" + year)
    .then((res) => res.json() as unknown as FeatureCollection<MultiPolygon>)
    .then((data) => data.features.filter((f) => f.properties!["NAME"]))
    .catch(() => []);
}
