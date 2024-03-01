import { useState, useEffect } from "react";
import { HistoryEvent, getAllEvents } from "../api/get-events";
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
      <Accordion type="single" collapsible className="w-full p-10">
        {sliceIntoChunks(events, 20).map((chunk, i) => (
          <AccordionItem value={"item-" + i}>
            <AccordionTrigger>{chunk[0].time}</AccordionTrigger>
            {chunk.map((event) => (
              <AccordionContent>
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
