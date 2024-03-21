import "leaflet/dist/leaflet.css";
import "leaflet";
import "./App.scss";
import { MapSection } from "./components/MapSection";
import { useEffect, useState } from "react";
import { TimeLineList } from "./components/TimeLineList";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./components/ui/resizable";
import { StorageHelper } from "./utils/storage";
import { SidebarControls } from "./components/SidebarControls";
import { SettingsPopover } from "./components/settings/SettingsPopover";

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
      <div className="top_menu p-5 flex justify-between">
        <div>Ukraine History Atlas</div>
        <div>
          <SettingsPopover />
        </div>
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="map">
            <MapSection date={date} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel maxSize={50} minSize={20} defaultSize={30}>
          <div className="sidebar h-screen">
            <SidebarControls date={date} setDate={setDate} />
            <TimeLineList setDate={setDate} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
