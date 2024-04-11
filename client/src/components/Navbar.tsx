import uaIcon from "../assets/ua_icon.png";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SavedEventsPage } from "./saved-events/SavedEventsPage";
import { SettingsPopover } from "./settings/SettingsPopover";
import { SignUpLoginDialog } from "./auth/SignupLoginDialog";
import { useAuthContext } from "./auth/AuthProvider";
import { toast } from "sonner";

function AuthButtons() {
  const { token, logout } = useAuthContext();
  const { t } = useTranslation();

  if (token) {
    return (
      <div>
        <Button
          variant="outline"
          className="ml-auto"
          onClick={() => {
            logout();
            toast(t("auth.success_loggout"));
          }}
        >
          <span>Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" className="ml-auto" asChild>
              <span>
                <span>{t(`auth.log_in`)}</span>
              </span>
            </Button>
          </DialogTrigger>

          <DialogContent>
            <SignUpLoginDialog />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export function Navbar() {
  const { t } = useTranslation();

  return (
    <div className="px-5 py-3 border-black shadow-[#b6b6b6] shadow-md bg-slate-50 fixed z-10 md:top-2 md:left-14 rounded-lg">
      <div className="flex justify-between align-center md:gap-10">
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
          <Sheet>
            <SheetTrigger
              onClick={() => {
                setTimeout(() => (document.body.style.pointerEvents = ""), 0);
              }}
            >
              {t(`saved`)}
            </SheetTrigger>
            <SheetContent side="left">
              <SavedEventsPage />
            </SheetContent>
          </Sheet>
          <AuthButtons />
          <div>
            <SettingsPopover />
          </div>
        </div>
      </div>
    </div>
  );
}
