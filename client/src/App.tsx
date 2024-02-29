import "leaflet/dist/leaflet.css";
import "leaflet";
import "./App.scss";
import { MapSection } from "./components/MapSection";
import { useEffect, useState } from "react";
import { DateInput } from "./components/DateInput";
import { TimeLineList } from "./components/TimeLineList";
import { StorageHelper } from "./utils/storage";

const mapModes = ["europe", "ukraine"] as const;

export type MapDisplayMode = (typeof mapModes)[number];

const mapModesDict: Record<MapDisplayMode, string> = {
  europe: "Europe",
  ukraine: "Ukraine and neigbors",
};

function App() {
  const [date, setDate] = useState<number>(StorageHelper.get("date", 900));
  const [mapMode, setMapMode] = useState<MapDisplayMode>(
    StorageHelper.get("mapMode", "europe")
  );

  useEffect(() => {
    const persistedDate = StorageHelper.get<number | null>("date", null);

    if (persistedDate !== date) {
      StorageHelper.set("date", date);
    }
  }, [date]);

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
                value={mapMode}
                onChange={(e) => {
                  const mode = e.target.value as unknown as MapDisplayMode;
                  setMapMode(mode);
                  StorageHelper.set("mapMode", mode);
                }}
              >
                {mapModes.map((mode) => (
                  <option key={mode} value={mode}>
                    {mapModesDict[mode]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <TimeLineList setDate={setDate} />
      </div>
    </div>
  );
}

export default App;
