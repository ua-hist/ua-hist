import { useState, useEffect, useRef } from "react";
import { HistoryEvent, getAllEvents } from "../api/get-events";
import { StorageHelper } from "../utils/storage";
import { events } from "../data/events";

const defaultEvent = events[120];

export function TimeLineList({ setDate }: { setDate: (d: number) => void }) {
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>(
    StorageHelper.get("selectedEventId", defaultEvent.id)
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
      `[data-id="${selectedEventId}"]`
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

  return (
    <div className="events_list" ref={listRef}>
      {events.map((event) => (
        <div
          className={
            "event " + (event.id === selectedEventId ? "selected" : "")
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
      ))}
    </div>
  );
}
