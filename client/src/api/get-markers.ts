import { markersWithDates } from "../data/markers";
import { getForEventIndex } from "../utils/timed-data";

export type MarkerIcon = {
  iconUrl: string;
  iconSize?: [number, number];
  iconAnchor?: [number, number];
  className?: string;
};

export type MarkerInfo = {
  id?: string;
  pos: [number, number];
  desc?: string;
  label?: string;
  icon?: MarkerIcon;
  type?: string;
};

export async function getMarkers(year: number): Promise<MarkerInfo[]> {
  return getForEventIndex(markersWithDates, year);
}
