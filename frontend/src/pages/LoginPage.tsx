import ImageUpload from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLoginUser, useSignupUser } from "@/hooks/useUsers";
import { loginSchema, type LoginFormValues } from "@/schema/login";
import { signupSchema, type SignupFormValues } from "@/schema/signup";
import authStore from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";
import { toast } from "sonner";

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const { login, isLoggedIn } = authStore();
  const signupMutation = useSignupUser({
    onSuccess: () => {
      toast.success("User signed up successfully!");
      setMode("login");
    },
  });

  const loginMutation = useLoginUser({
    onSuccess: (data) => {
      toast.success("User Logged In successfully!");
      console.log(data);
      login(data.data, data.token);

      navigate("/");
    },
  });

  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const signupForm = useForm<SignupFormValues>({
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const { errors } = loginForm.formState;

  const loginSubmitHandler = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  const signUpSubmitHandler = (values: SignupFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("image", values.image);
    signupMutation.mutate(formData);
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  if (mode === "signup") {
    return (
      <div className="flex items-center justify-center min-h-screen -mt-20">
        <Card className="w-xl ">
          <CardHeader>
            <CardTitle className="text-center">Signup</CardTitle>
            <CardDescription className="text-center">
              Create an account to share your favorite places with the world!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              onSubmit={signupForm.handleSubmit(signUpSubmitHandler)}
            >
              <ImageUpload
                id="image"
                onInput={(file) => {
                  signupForm.setValue("image", file);
                }}
                errorText={signupForm.formState.errors.image?.message}
              />
              <FieldSet className="w-full space-y-4">
                <FieldGroup className="space-y-4">
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      {...signupForm.register("name")}
                      aria-invalid={!!signupForm.formState.errors.name}
                    />
                    {signupForm.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {signupForm.formState.errors.name.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      {...signupForm.register("email")}
                      aria-invalid={!!signupForm.formState.errors.email}
                    />
                    {signupForm.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {signupForm.formState.errors.email.message}
                      </p>
                    )}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>

                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      {...signupForm.register("password")}
                      aria-invalid={!!signupForm.formState.errors.password}
                    />
                    {signupForm.formState.errors.password && (
                      <p className="text-sm text-destructive">
                        {signupForm.formState.errors.password.message}
                      </p>
                    )}
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Button
                loading={signupMutation.isPending}
                type="submit"
                className="w-full"
              >
                Signup
              </Button>
              <FieldDescription className="text-center">
                Already have an account?{" "}
                <a onClick={() => setMode("login")}>Login</a>
              </FieldDescription>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen -mt-20">
      <Card className="w-xl ">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Welcome back! Please enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={loginForm.handleSubmit(loginSubmitHandler)}
          >
            <FieldSet className="w-full space-y-4">
              <FieldGroup className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...loginForm.register("email")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...loginForm.register("password")}
                    aria-invalid={!!errors.password}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
            <Button
              type="submit"
              className="w-full"
              loading={loginMutation.isPending}
            >
              Login
            </Button>
            <FieldDescription className="text-center">
              Don't have an account?{" "}
              <a onClick={() => setMode("signup")}>Sign up</a>
            </FieldDescription>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
