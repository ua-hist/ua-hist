import "leaflet/dist/leaflet.css";
import "leaflet";
import "./App.scss";
import { MapSection } from "./components/MapSection";
import { useState } from "react";
import { DateInput } from "./components/DateInput";
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

function App() {
  const [date, setDate] = useState<number>(900);

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
