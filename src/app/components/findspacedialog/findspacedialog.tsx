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
} from "../ui/form";
import { Input } from "../ui/input";
import GetUniqueSpace from "@/actions/uniquespace";

const formSchema = z.object({
  spaceId: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function FindSpaceDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      spaceId: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });
  const submitvalues = (data: z.infer<typeof formSchema>) => {
    GetUniqueSpace(data.spaceId);
    console.log(data);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen((open) => !open)}>
      <DialogTrigger asChild>
        <Button>Find Space</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Looking For the Space</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitvalues)}>
              <FormField
                control={form.control}
                name="spaceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Space ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Space ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Find Space</Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
