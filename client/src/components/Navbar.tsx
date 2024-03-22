import uaIcon from "../assets/ua_icon.png";
import { GearIcon } from "@radix-ui/react-icons";
import { SettingsControls } from "./settings/SettingsControls";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";

export function SettingsPopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="ml-auto" asChild>
          <span>
            Settings
            <GearIcon className="ml-2 h-4 w-4" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 h-48" style={{ zIndex: 20 }}>
        <SettingsControls />
      </PopoverContent>
    </Popover>
  );
}

export function Navbar() {
  return (
    <div className="px-5 py-3 border-black shadow-[#b6b6b6] shadow-md bg-slate-50 fixed z-10 top-2 left-14 rounded-lg">
      <div className="flex justify-between align-center gap-10">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row justify-center items-center">
            <img className="w-10 h-10" src={uaIcon} alt="ua_icon_logo" />
          </div>

          <div className="flex flex-row justify-center items-center">
            <div className="text-lg font-medium text-slate-800">
              Ukraine History Atlas
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center">
          <NavLink to={"/saved"}>Saved events</NavLink>
        </div>
        <div>
          <SettingsPopover />
        </div>
      </div>
    </div>
  );
}
