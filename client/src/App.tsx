import "leaflet/dist/leaflet.css";
import "leaflet";
import "./App.scss";
import { MapSection } from "./components/MapSection";
import { useState } from "react";
import { DateInput } from "./components/DateInput";
import { TimeLineList } from "./components/TimeLineList";

function App() {
  const [date, setDate] = useState<number>(900);

  return (
    <div className="main">
      <div className="map">
        <MapSection date={date} />
      </div>
      <div className="sidebar">
        <div className="sidebar_top">
          <DateInput date={date} setDate={setDate} />
        </div>
        <div className="events_list">
          <TimeLineList setDate={setDate} />
        </div>
      </div>
    </div>
  );
}

export default App;
