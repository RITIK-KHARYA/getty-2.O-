"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Github, DiscIcon as Discord } from "lucide-react";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { signUp } from "../lib/auth-client";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signUp.email({
      name: values.email,
      email: values.email,
      password: values.password,
    });
  }

  async function signUpWithDiscord() {
    // Implement Discord sign-up logic here
    console.log("Sign up with Discord");
  }

  async function signUpWithGithub() {
    // Implement GitHub sign-up logic here
    console.log("Sign up with GitHub");
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="test@gmail.com"
                    {...field}
                    className="bg-neutral-800 bg-border-neutral-700/90 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    className="bg-neutral-800 bg-border-neutral-700/90 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-neutral-300/80 text-black text-sm hover:bg-neutral-500"
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  );
}
