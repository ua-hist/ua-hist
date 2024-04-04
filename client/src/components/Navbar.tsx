import uaIcon from "../assets/ua_icon.png";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SavedEventsPage } from "./saved-events/SavedEventsPage";
import { SettingsPopover } from "./settings/SettingsPopover";

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
          <div>
            <SettingsPopover />
          </div>
        </div>
      </div>
    </div>
  );
}

function SignUpLoginDialog() {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="signup">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">{t(`auth.sign_up`)}</TabsTrigger>
        <TabsTrigger value="login">{t(`auth.login`)}</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardDescription>{t(`auth.make_changes`)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">{t(`auth.name`)}</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">{t(`auth.username`)}</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>{t(`auth.save_changes`)}</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardDescription>{t(`auth.change_password`)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">{t(`auth.current_password`)}</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">{t(`auth.new_password`)}</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>{t(`auth.save_password`)}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
