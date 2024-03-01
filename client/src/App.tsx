import "leaflet/dist/leaflet.css";
import "leaflet";
import "./App.scss";
import { MapSection } from "./components/MapSection";
import { useEffect, useState } from "react";
import { TimeLineList } from "./components/TimeLineList";
import { StorageHelper } from "./utils/storage";
import { MapDisplayMode, SidebarControls } from "./components/SidebarControls";

function App() {
  const [date, setDate] = useState<number>(StorageHelper.get("date", 900));
  const [mapMode, setMapMode] = useState<MapDisplayMode>(
    StorageHelper.get("mapMode", "europe"),
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
        <SidebarControls
          date={date}
          setDate={setDate}
          mapMode={mapMode}
          setMapMode={setMapMode}
        />

        <TimeLineList setDate={setDate} />
      </div>
    </div>
  );
}

export default App;
