import { StorageHelper } from "../utils/storage";
import { DateInput } from "./DateInput";

const mapModes = ["europe", "ukraine"] as const;

export type MapDisplayMode = (typeof mapModes)[number];

const mapModesDict: Record<MapDisplayMode, string> = {
  europe: "Europe",
  ukraine: "Ukraine and neigbors",
};

export function SidebarControls(props: {
  mapMode: MapDisplayMode;
  setMapMode: (v: MapDisplayMode) => void;
  date: number;
  setDate: (v: number) => void;
}) {
  const { date, setDate, mapMode, setMapMode } = props;

  return (
    <div className="sidebar_top py-2 px-5">
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
  );
}
