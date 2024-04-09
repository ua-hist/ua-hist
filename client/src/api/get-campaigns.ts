import { Feature, LineString } from "geojson";
import { getForEventIndex } from "../utils/timed-data";
import { campaignsWithDates } from "../data/campaigns/campaigns";

export type CampaignInfo = {
  path: Feature<LineString>;
  color?: string;
  desc?: string;
};

export async function getCampaigns(year: number): Promise<CampaignInfo[]> {
  return getForEventIndex(campaignsWithDates, year);
}
