import "leaflet/dist/leaflet.css";
import "leaflet";
import "./App.scss";
import { MapSection } from "./components/maps/MapSection";
import { useEffect, useState } from "react";
import { TimeLineList } from "./components/TimeLineList";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./components/ui/resizable";
import { StorageHelper } from "./utils/storage";
import { Navbar } from "./components/Navbar";

function App() {
  const [date, setDate] = useState<number>(StorageHelper.get("date", 900));

  useEffect(() => {
    const persistedDate = StorageHelper.get<number | null>("date", null);

    if (persistedDate !== date) {
      StorageHelper.set("date", date);
    }
  }, [date]);

  return (
    <div>
      <Navbar />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="map">
            <MapSection date={date} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel maxSize={50} minSize={20} defaultSize={30}>
          <div className="sidebar">
            <TimeLineList setDate={setDate} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
