import "leaflet/dist/leaflet.css";
import "leaflet";
import "./App.scss";
import { MapSection } from "./components/MapSection";
import { useState } from "react";
import { DateInput } from "./components/DateInput";
import { TimeLineList } from "./components/TimeLineList";

const mapModes = ["europe", "ukraine"] as const;

export type MapDisplayMode = (typeof mapModes)[number];

function App() {
  const [date, setDate] = useState<number>(900);
  const [mapMode, setMapMode] = useState<MapDisplayMode>("europe");

  return (
    <div className="main">
      <div className="map">
        <MapSection mapMode={mapMode} date={date} />
      </div>
      <div className="sidebar">
        <div className="sidebar_top">
          <div className="flex flex-col">
            <DateInput date={date} setDate={setDate} />
            <div className="flex flex-row">
              <div>Map scope: </div>
              <select
                onChange={(e) => {
                  console.log(e.target.value);
                  setMapMode(e.target.value as unknown as MapDisplayMode);
                }}
              >
                {mapModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="events_list">
          <TimeLineList setDate={setDate} />
        </div>
      </div>
    </div>
  );
}

export default App;
