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
import { getEventChunks } from "../utils/get-event-chunks";

export function TimeLineList({ setDate }: { setDate: (d: number) => void }) {
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>(
    StorageHelper.get("selectedEventId", defaultEvent.id),
  );

  function getSelectedAccordionIndex(chunks: { events: HistoryEvent[] }[]) {
    return chunks.findIndex((c) =>
      c.events.find((e) => e.id === selectedEventId),
    );
  }

  const listRef = useRef<HTMLDivElement>(null);

  async function scrollIntoEvent1(events: HistoryEvent[]) {
    const list = listRef.current;

    if (!list) {
      return;
    }

    await new Promise((r) => setTimeout(r, 100));

    const chunks = getEventChunks(events);
    const selectedAccordion = chunks.findIndex((c) =>
      c.events.find(
        (e) => e.id === StorageHelper.get("selectedEventId", defaultEvent.id),
      ),
    );

    if (selectedAccordion < 0) {
      return;
    }

    const selectedEventEl = list.querySelector(
      `.accord_item_${selectedAccordion}`,
    );
    if (selectedEventEl) {
      selectedEventEl.scrollIntoView();
    }
  }

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
        return res;
      })
      // .then((events) => scrollIntoEvent1(events));
      .then(() => scrollIntoEvent());
  }, []);

  const handleEventClick = (record: HistoryEvent) => {
    setSelectedEventId(record.id);
    StorageHelper.set("selectedEventId", record.id);
    record.startYear && setDate(record.startYear);
  };

  const chunks = getEventChunks(events);

  const selectedAccordion = getSelectedAccordionIndex(chunks);

  return (
    <div className="events_list" ref={listRef}>
      {chunks.length && (
        <Accordion
          type="single"
          collapsible
          className="w-full p-10"
          defaultValue={
            selectedAccordion >= 0 ? `item-${selectedAccordion}` : undefined
          }
        >
          {chunks.map((chunk, i) => (
            <AccordionItem
              value={`item-${i}`}
              key={i}
              className={`accord_item_${i}`}
            >
              <AccordionTrigger className="text-md">
                {chunk.title}
              </AccordionTrigger>
              {chunk.events.map((event) => (
                <AccordionContent key={event.id}>
                  <div
                    className={
                      "event " +
                      (event.id === selectedEventId ? "selected" : "")
                    }
                    data-id={event.id}
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
      )}
    </div>
  );
}
