"use client";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import AttachmentButton from "@/app/example-uploader/index";
import { CreateSpace } from "@/actions/space";

export const formSchema = z.object({
  spacename: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string().min(10, {
    message: "Username must be at least 2 characters.",
  }),
  banner: z.string().min(0, "required"),
});

export function ProfileForm() {
  const [open, setOpen] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spacename: "",
      bio: "",
      banner: "",
    },
  });
  const submitvalues = async (data: z.infer<typeof formSchema>) => {
    console.log("submited", data);
    try {
      setIsLoading(true);
       await CreateSpace(data);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
      setOpen(false);
    }

    
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen((open) => !open);
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-blue-700/60 text-white hover:bg-blue-900">
          Create space
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitvalues)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="spacename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Space Name</FormLabel>
                  <FormControl>
                    <Input placeholder="space name" {...field} />
                  </FormControl>
                  <FormDescription>This is your Space name</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="space name  " {...field} />
                  </FormControl>
                  <FormDescription>Tell about your space</FormDescription>
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="banner"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AttachmentButton
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-x-2">
              <Button type="submit">{isLoading ? "Creating..." : "Create"}</Button>
              <Button
                className="bg-red-500 hover:bg-red-700 text-white w-24"
                type="button"
                onClick={(open) => setOpen(!open)}
              >
                Close
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
