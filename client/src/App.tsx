import "leaflet/dist/leaflet.css";
import "leaflet";
import "./App.scss";
import { MapSection } from "./components/MapSection";
import { useEffect, useState } from "react";
import { HistoryEvent, getAllEvents } from "./api/get-events";
import { DateInput } from "./components/DateInput";

function App() {
  const [events, setEvents] = useState<HistoryEvent[]>([]);
  const [date, setDate] = useState<number>(900);

  useEffect(() => {
    getAllEvents().then((res) => {
      setEvents(res);
    });
  }, []);

  return (
    <div className="main">
      <div className="map">
        <MapSection date={date} />
      </div>
      <div className="events_list">
        <DateInput date={date} setDate={setDate} />
        {events.map((event) => (
          <div className="event" key={event.id}>
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
  );
}

export default App;
