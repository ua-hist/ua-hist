import uaIcon from "../assets/ua_icon.png";
import { GearIcon } from "@radix-ui/react-icons";
import { SettingsControls } from "./settings/SettingsControls";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { LanguageSwitcher } from "./ui/language-switcher";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SettingsPopover() {
  const { t } = useTranslation();

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="ml-auto" asChild>
          <span>
            <GearIcon className="h-4 w-4" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 h-56" style={{ zIndex: 20 }}>
        <SettingsControls />
      </PopoverContent>
    </Popover>
  );
}

export function Navbar() {
  const { t } = useTranslation();

  return (
    <div className="px-5 py-3 border-black shadow-[#b6b6b6] shadow-md bg-slate-50 fixed z-10 top-2 left-14 rounded-lg">
      <div className="flex justify-between align-center gap-10">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row justify-center items-center">
            <img className="w-10 h-10" src={uaIcon} alt="ua_icon_logo" />
          </div>

          <div className="flex flex-row justify-center items-center">
            <div className="text-lg font-medium text-slate-800">
              {t(`title`)}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-row justify-center items-center">
            <NavLink to={"/saved"}>
              <Button variant="outline" className="ml-auto" asChild>
                <span>{t(`saved`)}</span>
              </Button>
            </NavLink>
          </div>
          <div>
            <Dialog>
              <DialogTrigger>
                <Button variant="outline" className="ml-auto" asChild>
                  <span>
                    <span>SignUp</span>
                    <span className="text-gray-400">/</span>
                    <span>Login</span>
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <SettingsPopover />
          </div>
        </div>
      </div>
    </div>
  );
}
