import { useState } from "react";
import uaIcon from "../../assets/ua_icon.png";
import { StorageHelper } from "../../utils/storage";
import { events } from "../../data/events";
import { HistoryEvent } from "../../api/get-events";

export function NavbarFull() {
  return (
    <>
      <div className="h-16 px-5 py-3 shadow-[#b6b6b6] shadow-md"></div>
      <div className="h-16 px-5 py-3 shadow-[#b6b6b6] shadow-md z-50 fixed top-0 left-0 right-0 bg-white">
        <div className="flex justify-between align-center gap-10">
          <div className="flex flex-row gap-4">
            <div className="flex flex-row justify-center items-center">
              <img className="w-10 h-10" src={uaIcon} alt="ua_icon_logo" />
            </div>
            <div className="flex flex-row justify-center items-center">
              <div className="text-lg font-medium text-slate-800">
                Ukraine History Atlas
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function SavedEventsPage() {
  const [savedEvents, setSavedEvents] = useState<string[]>(
    StorageHelper.get("savedEvents", []),
  );

  const savedEventsPopulated = savedEvents
    .map((eventId) => events.find((e) => e.id === eventId))
    .filter((e) => !!e) as HistoryEvent[];

  return (
    <div>
      <NavbarFull />
      <div>
        <div className="flex flex-col w-[60%] m-auto">
          {savedEventsPopulated.map((event) => (
            <div className={"event "} data-id={event.id} key={event.id}>
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
      </div>
    </div>
  );
}
