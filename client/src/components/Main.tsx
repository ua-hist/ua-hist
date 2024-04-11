import Draggable from "react-draggable";
import { MapSection } from "../components/maps/MapSection";
import { Navbar } from "./Navbar";
import { TimeLineList } from "./timeline/TimeLineList";
import { Slider } from "./ui/slider";
import { useDateContext } from "./date/DateContext";
import { numToCenturyStart } from "../utils/century";
import { useState, useMemo, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
} from "./ui/drawer";
import { CalendarIcon } from "@radix-ui/react-icons";

type Props = {
  children: React.ReactNode;
  waitBeforeShow?: number;
};

function Delayed({ children, waitBeforeShow = 0 }: Props) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  return isShown ? children : null;
}

function List() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const timeLine = useMemo(
    () => (
      <Delayed>
        <TimeLineList />
      </Delayed>
    ),
    [],
  );

  if (isDesktop) {
    return (
      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        grid={[25, 25]}
        scale={1}
      >
        <div className="h-[calc(75dvh)] bg-white absolute right-12 shadow-2xl rounded-xl w-96 top-24 transition-all overflow-hidden">
          <div className="h-full relative">
            <div className="handle absolute bottom-0 w-24 hover:cursor-grab left-0 right-0 m-auto text-center p-4">
              <div className="h-2 bg-black rounded-md"></div>
            </div>
            <div className="overflow-y-scroll h-full">{timeLine}</div>
          </div>
        </div>
      </Draggable>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} modal={false}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="absolute right-4 bottom-10 text-xl"
        >
          <CalendarIcon className="w-6 h-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="h-[calc(25dvh)] overflow-y-scroll">{timeLine}</div>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function TimeSlider() {
  const { setDate } = useDateContext();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return null;
  }

  return (
    <div className="absolute -bottom-4 hover:bottom-0 w-full transition-all py-4">
      <div className="container">
        <Slider
          defaultValue={[2]}
          max={21}
          min={-4}
          step={1}
          onValueCommit={([centuryIndex]) => {
            const year = numToCenturyStart(centuryIndex);
            // console.log(year);
            setDate(year);
          }}
        />
      </div>
    </div>
  );
}

export function Main() {
  return (
    <div className="!max-h-screen h-screen relative min-h-screen overflow-hidden">
      <Navbar />
      <div className="relavite h-screen overflow-hidden">
        <div className="h-screen relative">
          <MapSection />
          <TimeSlider />
        </div>
        <List />
      </div>
    </div>
  );
}
