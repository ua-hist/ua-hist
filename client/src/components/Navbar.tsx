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
import { useCoordinatesStore } from "../store/coordinates";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";

function AddEventForm() {
  const coordinates = useCoordinatesStore((state) => state.coordinates);
  const setIsActive = useCoordinatesStore((state) => state.setIsActive);
  const isActive = useCoordinatesStore((state) => state.isActive);
  const resetCoordinates = useCoordinatesStore((state) => state.reset);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<any>();
  const onSubmit: SubmitHandler<any> = (data) => {
    if (coordinates.lat === 0 && coordinates.lng === 0) {
      setError("body", { message: "Pick coordinates on a map" });
      return;
    }
    resetCoordinates();
    toast("created");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardHeader>
        <CardDescription>Створити подію</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input type="number" />
        </div>
        <div className="space-y-1">
          <Textarea id="body" {...register("body", { required: true })} />
          {errors.body && <span>{errors.body.message}</span>}
        </div>
        <div className="space-y-1">
          <Button
            variant={isActive ? "destructive" : "secondary"}
            onClick={() => setIsActive(true)}
            type="button"
          >
            Pick coordinates on a map
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit">{t(`auth.log_in`)}</Button>
      </CardFooter>
    </form>
  );
}

function AddEvent() {
  return (
    <Sheet modal={false}>
      <SheetTrigger>Add event</SheetTrigger>
      <SheetContent side="left">
        <AddEventForm />
      </SheetContent>
    </Sheet>
  );
}

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
          <span>{t('auth.logout')}</span>
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
    <div className="px-5 w-full sm:w-fit py-3 border-black shadow-[#b6b6b6] shadow-md bg-slate-50 fixed z-10 md:top-2 md:left-14 rounded-lg">
      <div className="flex justify-between align-center sm:gap-10">
        <div className="flex flex-row gap-4">
          <div className="flex flex-row justify-center items-center">
            <img className="w-10 h-10" src={uaIcon} alt="ua_icon_logo" />
          </div>

          <div className="flex flex-row justify-center items-center">
            <div className="hidden sm:block text-lg font-medium text-slate-800">
              {t(`title`)}
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <AddEvent />
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
