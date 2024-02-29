import { events } from "../data/events";

export const apiUrl = "http://localhost:3000";

export type HistoryEvent = {
  id: string;
  time: string;
  events: string;
  eventsMarkup: string;
  eventIndex: number;
  startYear?: number;
};

export const getAllEvents = async (): Promise<HistoryEvent[]> => {
  return Promise.resolve(events).then((records: HistoryEvent[]) => records);
};
