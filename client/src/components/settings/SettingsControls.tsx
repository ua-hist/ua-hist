import { MapModeControl } from "./MapModeControl";

export function SettingsControls() {
  return (
    <div className="sidebar_top py-2 px-5">
      <div className="flex flex-col">
        <MapModeControl />
      </div>
    </div>
  );
}
