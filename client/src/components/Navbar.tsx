import { SettingsPopover } from "./settings/SettingsPopover";

export function Navbar() {
  return (
    <>
      <div className="navbar_placeholder p-5 h-16"></div>
      <div className="navbar fixed top-0 left-0 right-0 p-5 h-16 flex justify-between align-center shadow-[#b6b6b6] shadow-md">
        <div>Ukraine History Atlas</div>
        <div>
          <SettingsPopover />
        </div>
      </div>
    </>
  );
}
