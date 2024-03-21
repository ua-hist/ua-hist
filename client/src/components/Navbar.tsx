import { SettingsPopover } from "./settings/SettingsPopover";
import uaIcon from "../assets/ua_icon.png";

export function Navbar() {
  return (
    <>
      <div className="navbar_placeholder p-5 h-16"></div>
      <div className="navbar fixed top-0 left-0 right-0 p-5 h-16 flex justify-between align-center shadow-[#b6b6b6] shadow-md">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row justify-center items-center">
            <img className="w-10 h-10" src={uaIcon} alt="ua_icon_logo" />
          </div>
          <div className="flex flex-row justify-center items-center">
            <div className="text-lg font-medium text-slate-800">
              Ukraine History Atlas
            </div>
          </div>
        </div>
        <div>
          <SettingsPopover />
        </div>
      </div>
    </>
  );
}
