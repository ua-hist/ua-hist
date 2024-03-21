import { SettingsControls } from "./SettingsControls";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

export function SettingsPopover() {
  return (
    <Popover>
      <PopoverTrigger>Settings</PopoverTrigger>
      <PopoverContent className="w-96 h-48">
        <SettingsControls />
      </PopoverContent>
    </Popover>
  );
}
