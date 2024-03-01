import { useState, useEffect, useRef } from "react";
import { HistoryEvent, getAllEvents } from "../api/get-events";
import { StorageHelper } from "../utils/storage";
import { events } from "../data/events";

const defaultEvent = events[120];
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

function sliceIntoChunks<T>(arr: T[], chunkSize: number): T[][] {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

export function TimeLineList({ setDate }: { setDate: (d: number) => void }) {
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>(
    StorageHelper.get("selectedEventId", defaultEvent.id),
  );

  const listRef = useRef<HTMLDivElement>(null);

  async function scrollIntoEvent() {
    const list = listRef.current;

    if (!list) {
      return;
    }

    console.log(selectedEventId);

    await new Promise((r) => setTimeout(r, 100));

    const selectedEventEl = list.querySelector(
      `[data-id="${selectedEventId}"]`,
    );

    if (selectedEventEl) {
      selectedEventEl.scrollIntoView();
    }
  }

  useEffect(() => {
    getAllEvents()
      .then((res) => {
        setEvents(res);
      })
      .then(() => scrollIntoEvent());
  }, []);

  const handleEventClick = (record: HistoryEvent) => {
    setSelectedEventId(record.id);
    StorageHelper.set("selectedEventId", record.id);
    record.startYear && setDate(record.startYear);
  };

  function getTriggerText(first: HistoryEvent, last: HistoryEvent) {
    return `Від ${first.startYear && first.startYear < 0 ? first.time : first.startYear} до ${last.time}`;
  }

  return (
    <>
      <Accordion type="single" collapsible className="w-full p-10">
        {sliceIntoChunks(events, 20).map((chunk, i) => (
          <AccordionItem value={"item-" + i} key={i}>
            <AccordionTrigger className="text-md">
              {getTriggerText(chunk[0], chunk[chunk.length - 1])}
            </AccordionTrigger>
            {chunk.map((event) => (
              <AccordionContent key={event.id}>
                <div
                  className="event"
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="event_time">
                    <div>{event.time}</div>
                  </div>
                  <div
                    className="event_desc"
                    dangerouslySetInnerHTML={{
                      __html: event.eventsMarkup,
                    }}
                  ></div>
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
