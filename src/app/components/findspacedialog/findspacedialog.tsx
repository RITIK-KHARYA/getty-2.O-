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
import { formSchema2 } from "@/app/lib/Validation";
import { GetSpaceOnSearch } from "@/actions/space";

export default function FindSpaceDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema2>>({
    defaultValues: {
      spacename: "",
    },
    resolver: zodResolver(formSchema2),
  });
  const submitvalues = async (data: z.infer<typeof formSchema2>) => {
    try {
      setIsLoading(true);
      await GetSpaceOnSearch(data);
      console.log(data);
    } catch (error) {
      console.log("error here");
      throw new Error("unable to find space");
    } finally {
      form.reset();
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger>
        <div className="text-sm rounded-sm flex justify-center items-center font-semibold bg-white text-black w-24 h-9 ">
          Find Space
        </div>
      </DialogTrigger>
      <DialogContent className="gap-y-5">
        <DialogHeader>
          <DialogTitle>Find Space</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitvalues)}>
            <FormField
              control={form.control}
              name="spacename"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Space ID" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs">
                    {form.formState.errors.spacename?.message}
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
