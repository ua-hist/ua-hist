import { Feature, Polygon } from "geojson";
import { apiUrl } from "./get-events";

export function getMaps(year: number): Promise<Feature<Polygon>[]> {
  return fetch(apiUrl + "/maps/" + year)
    .then((res) => res.json())
    .then((data) => data.features);
}
