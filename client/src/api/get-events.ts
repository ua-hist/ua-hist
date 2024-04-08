import { events } from "../data/events";
import { eventsEn } from "../data/events.en";

export const apiUrl = "http://localhost:3000";

export type HistoryEvent = {
  id: string;
  time: string;
  events: string;
  eventsMarkup: string;
  eventIndex: number;
  startYear?: number;
};

export const getAllEvents = async (locale = "en"): Promise<HistoryEvent[]> => {
  return Promise.resolve(locale === "en" ? eventsEn : events).then(
    (records: HistoryEvent[]) =>
      records.sort((a, b) => a.startYear! - b.startYear!),
  );
};
