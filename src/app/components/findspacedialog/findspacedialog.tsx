"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormField,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";


export const formSchema2 = z.object({
  spaceId: z.string().min(1, { message: "Space ID is required" }),
});

export default function FindSpaceDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema2>>({
    defaultValues: {
      spaceId: "",
    },
    resolver: zodResolver(formSchema2),
  });
  const submitvalues = async (data: z.infer<typeof formSchema2>) => {
    try {
      
    } catch (error) {
      console.log("bhai lvde lg gye");
      throw new Error("unable to find space");
    }
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger asChild>
        <Button>Find Space</Button>
      </DialogTrigger>
      <DialogContent className="gap-y-5">
        <DialogHeader>
          <DialogTitle>Find Space</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitvalues)}>
            <FormField
              control={form.control}
              name="spaceId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Space ID" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs">
                    {form.formState.errors.spaceId?.message}
                  </FormMessage>
                  <FormDescription className="text-sm">
                    Only space Id
                  </FormDescription>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" className="mt-2 w-20 h-7 text-sm">
                Search
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
