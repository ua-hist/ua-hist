import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { HistoryEvent } from "../../api/get-events";
import { StorageHelper } from "../../utils/storage";

export function TimeLineEvent({
  event,
  selectedEventId,
  handleEventClick,
}: {
  event: HistoryEvent;
  selectedEventId: string;
  handleEventClick: (record: HistoryEvent) => void;
}) {
  const foo = (
    <ContextMenu>
      <ContextMenuTrigger>
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
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );

  function handleSave() {
    const savedEvents = StorageHelper.get<string[]>("savedEvents", []);

    StorageHelper.set("savedEvents", savedEvents.concat(event.id));
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
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
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleSave}>Save</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
