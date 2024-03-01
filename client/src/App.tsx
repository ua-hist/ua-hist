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

interface SideBarProps {
  children?: React.ReactNode;
}
function SideBar({ children }: SideBarProps) {
  return <div className="h-screen overflow-auto">{children}</div>;
}
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
    <div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="map">
            <MapSection date={date} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel maxSize={50} minSize={20} defaultSize={30}>
          <SideBar>
            <TimeLineList setDate={setDate} />
          </SideBar>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
