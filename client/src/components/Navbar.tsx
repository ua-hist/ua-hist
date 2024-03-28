import uaIcon from "../assets/ua_icon.png";
import { GearIcon } from "@radix-ui/react-icons";
import { SettingsControls } from "./settings/SettingsControls";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

        <div className="flex flex-row gap-4">
          <div className="flex flex-row justify-center items-center">
            <NavLink to={"/saved"}>
              <Button variant="outline" className="ml-auto" asChild>
                <span>Saved Events</span>
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
  return (
    <Tabs defaultValue="account">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">SignUp</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
