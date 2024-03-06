import { HistoryEvent } from "../api/get-events";

function sliceIntoChunks<T>(arr: T[], chunkSize: number): T[][] {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

function getChunkTitle(chunk: HistoryEvent[]) {
  const first = chunk[0];
  const last = chunk[chunk.length - 1];

  return `Від ${first.startYear && first.startYear < 0 ? first.time : first.startYear} до ${last.time}`;
}

export function getEventChunks(
  events: HistoryEvent[],
): { title: string; events: HistoryEvent[] }[] {
  return sliceIntoChunks(events, 20).map((chunk) => ({
    title: getChunkTitle(chunk),
    events: chunk,
  }));
}
