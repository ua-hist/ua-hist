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
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUser, siginUser } from "../../api/auth";
import { toast } from "sonner";
import { useAuthContext } from "./AuthProvider";

type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpInput>();
  const { t } = useTranslation();
  const onSubmit: SubmitHandler<SignUpInput> = (data) => {
    createUser(data).then((res) => {
      if (res.message) {
        setError("email", { message: t("auth.already_have_account") });
        return;
      }
      toast(t("auth.success_registered"));
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardDescription>{t(`auth.signup`)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">{t(`auth.name`)}</Label>
            <Input id="name" {...register("name", { required: true })} />
            {errors.name && <span>This field is required</span>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">{t(`auth.email`)}</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">{t(`auth.password`)}</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{t(`auth.save_changes`)}</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

type LogInInput = {
  email: string;
  password: string;
};

function LogIn() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LogInInput>();
  const { setToken } = useAuthContext();
  const onSubmit: SubmitHandler<LogInInput> = (data) => {
    siginUser(data).then((res) => {
      console.log(res);
      if (res.message) {
        setError("email", { message: t("auth.invalid_credentials") });
        return;
      }
      toast(t("auth.success_logged_in"));
      setToken(res.token);
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardDescription>{t(`auth.log_in`)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">{t(`auth.email`)}</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">{t(`auth.password`)}</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && <span>This field is required</span>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">{t(`auth.log_in`)}</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export function SignUpLoginDialog() {
  const { t } = useTranslation();

  return (
    <Tabs defaultValue="signup">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">{t(`auth.sign_up`)}</TabsTrigger>
        <TabsTrigger value="login">{t(`auth.login`)}</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <SignUp />
      </TabsContent>

      <TabsContent value="login">
        <LogIn />
      </TabsContent>
    </Tabs>
  );
}
