import { GearIcon } from "@radix-ui/react-icons";
import { SettingsControls } from "../settings/SettingsControls";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

export function SettingsPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="ml-auto" asChild>
          <span>
            <GearIcon className="h-4 w-4" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" style={{ zIndex: 20 }}>
        <SettingsControls />
      </PopoverContent>
    </Popover>
  );
}
