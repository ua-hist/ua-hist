import { MapSection } from "../components/maps/MapSection";
import { TimeLineList } from "../components/timeline/TimeLineList";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../components/ui/resizable";

export function Main() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <div className="map">
          <MapSection />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel maxSize={50} minSize={20} defaultSize={30}>
        <div className="sidebar">
          <TimeLineList />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
