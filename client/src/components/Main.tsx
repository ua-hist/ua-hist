import Draggable from "react-draggable";
import { MapSection } from "../components/maps/MapSection";
import { Navbar } from "./Navbar";
import { TimeLineList } from "./timeline/TimeLineList";
import { Slider } from "./ui/slider";
import { useState } from "react";

export function Main() {
  const [century, setCentury] = useState(2);

  return (
    <div className="!max-h-screen h-screen relative min-h-screen overflow-hidden">
      <Navbar />
      <div className="relavite h-screen overflow-hidden">
        <div className="h-screen relative">
          <MapSection />
          <div className="absolute -bottom-4 hover:bottom-0 w-full transition-all py-4">
            <div className="container">
              <Slider defaultValue={[2]} max={10} min={-1} step={1} />
            </div>
          </div>
        </div>
        <Draggable
          axis="x"
          handle=".handle"
          defaultPosition={{ x: 0, y: 0 }}
          grid={[25, 25]}
          scale={1}
        >
          <div className="h-[calc(80dvh)] bg-white absolute right-12 shadow-2xl rounded-xl w-96 top-24 transition-all overflow-hidden">
            <div className="h-full relative">
              <div className="handle absolute bottom-0 w-24 hover:cursor-grab left-0 right-0 m-auto text-center p-4">
                <div className="h-2 bg-black rounded-md"></div>
              </div>
              <div className="overflow-y-scroll h-full">
                <TimeLineList />
              </div>
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  );
}
