"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import authSchema from "@/_schemas/auth.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";
import signUpAction from "../actions/signup.action";
import LoadingIcon from "@/_components/loading-icon";
import Alert from "@/_components/alert";
import routes from "@/lib/routes";
import OAuthButton from "@/_components/oauth-button";
import { Checkbox } from "@workspace/ui/components/checkbox";

export default function SignUpForm() {
  const signUpForm = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      terms_accepted: false,
    },
  });

  const {
    mutate: signUp,
    isPending,
    isError,
    error
  } = useMutation({
    mutationFn: signUpAction
  });

  const onSubmit = (values: z.infer<typeof authSchema>) => {
    signUp(values);
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
        <CardDescription className="text-balance text-sm">
          Enter your email and password to create a new account
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 justify-center">
        <Alert message={(error as Error)?.message as string} isError={isError} />
        <Form {...signUpForm}>
          <form
            method="post"
            onSubmit={signUpForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 justify-center"
          >
            <FormField
              control={signUpForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signUpForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="*******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={signUpForm.control}
              name="terms_accepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      By clicking sign up you accept our terms.
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Button disabled={isPending} className="w-full" type="submit">
              {isPending ? <LoadingIcon /> : ""} <p>Create a free account</p>
            </Button>
          </form>
        </Form>

        <OAuthButton />

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href={routes.auth.signin}
            className="underline underline-offset-4"
          >
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
