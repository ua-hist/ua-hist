import { useState, useEffect } from "react";
import { HistoryEvent, getAllEvents } from "../api/get-events";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";

export function TimeLineList({ setDate }: { setDate: (d: number) => void }) {
  const [events, setEvents] = useState<HistoryEvent[]>([]);

  useEffect(() => {
    getAllEvents().then((res) => {
      setEvents(res);
    });
  }, []);

  const handleEventClick = (record: HistoryEvent) => {
    // setSelectedRecordId(record.id);
    // console.log(record.eventIndex);
    record.startYear && setDate(record.startYear);
  };

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {events.map((event) => (
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
      ))}
    </>
  );
}
