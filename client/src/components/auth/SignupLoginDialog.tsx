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

type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>();
  const onSubmit: SubmitHandler<SignUpInput> = (data) => console.log(data);
  const { t } = useTranslation();

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
            {errors.email && <span>This field is required</span>}
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
    formState: { errors },
  } = useForm<LogInInput>();
  const onSubmit: SubmitHandler<LogInInput> = (data) => console.log(data);

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
            {errors.email && <span>This field is required</span>}
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
