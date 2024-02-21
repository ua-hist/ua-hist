import { dates } from "./dates";

export const apiUrl = "http://localhost:3000";

export type HistoryEvent = {
  id: string;
  time: string;
  events: string;
  eventsMarkup: string;
  eventIndex: number;
  startYear?: number;
};

const replaceLinks = (record: HistoryEvent): HistoryEvent => {
  const markup = record.eventsMarkup.replace(
    new RegExp(`href="/wiki`, "g"),
    `href="https://uk.wikipedia.org/wiki`
  );

  return { ...record, eventsMarkup: markup };
};

export const getAllEvents = async (): Promise<HistoryEvent[]> => {
  return fetch(apiUrl + "/events")
    .then((res) => res.json())
    .then((records: HistoryEvent[]) =>
      records.map(replaceLinks).map((r, i) => {
        r.startYear = dates[i];

        return r;
      })
    );
};
