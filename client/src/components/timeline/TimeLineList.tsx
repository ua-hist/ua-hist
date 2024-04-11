import { useState, useEffect, useRef, useMemo } from "react";
import { HistoryEvent, getAllEvents } from "../../api/get-events";
import { StorageHelper } from "../../utils/storage";
import { events } from "../../data/events";

const defaultEvent = events[120];
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { getEventChunks } from "../../utils/get-event-chunks";
import { useDateContext } from "../date/DateContext";
import { useScrollIntoEvent } from "./useScrollIntoEvent";
import { TimeLineEvent } from "./TimeLineEvent";
import { useTranslation } from "react-i18next";

export function TimeLineList() {
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>(
    StorageHelper.get("selectedEventId", defaultEvent.id),
  );

  const { t, i18n } = useTranslation();

  const { setDate } = useDateContext();

  const listRef = useRef<HTMLDivElement>(null);

  const scrollIntoEvent = useScrollIntoEvent(listRef, selectedEventId);

  useEffect(() => {
    getAllEvents(i18n.language)
      .then((res) => {
        setEvents(res);
        return res;
      })
      .then(() => scrollIntoEvent());
  }, [i18n.language]);

  const handleEventClick = (record: HistoryEvent) => {
    setSelectedEventId(record.id);
    StorageHelper.set("selectedEventId", record.id);
    record.startYear && setDate(record.startYear);
  };

  const chunks = getEventChunks(events);

  function getSelectedAccordion(chunks: { events: HistoryEvent[] }[]) {
    const selectedAccordion = chunks.findIndex((c) =>
      c.events.find((e) => e.id === selectedEventId),
    );

    return selectedAccordion >= 0 ? `item-${selectedAccordion}` : undefined;
  }

  return (
    <div className="h-full w-full" ref={listRef}>
      {!!chunks.length && (
        <Accordion
          type="single"
          collapsible
          defaultValue={getSelectedAccordion(chunks)}
        >
          {chunks.map((chunk, i) => (
            <AccordionItem
              value={`item-${i}`}
              key={i}
              className={`accord_item_${i}`}
            >
              <AccordionTrigger className="text-md">
                {t("dateRange.from")} {chunk.title[0]} {t("dateRange.to")}{" "}
                {chunk.title[1]}
              </AccordionTrigger>
              {chunk.events.map((event) => (
                <AccordionContent key={event.id}>
                  <TimeLineEvent
                    event={event}
                    selectedEventId={selectedEventId}
                    handleEventClick={handleEventClick}
                  />
                </AccordionContent>
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
