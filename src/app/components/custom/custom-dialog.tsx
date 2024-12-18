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
  import  AttachmentButton  from "@/app/example-uploader/page";
import { CreateSpace } from "@/actions/space";

  const formSchema = z.object({
    spacename: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    bio: z.string().min(10, {
      message: "Username must be at least 2 characters.",
    }),
  });

  export function ProfileForm() {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        spacename: "",
        bio: "",
      },
    });
    const submitvalues = (data: z.infer<typeof formSchema>) => {
      console.log(data);
      CreateSpace(data.spacename, data.bio);
      setOpen(false); 
    };
    return (
      <Dialog
        open={open} 
        onOpenChange={() => {
          setOpen((open) => !open);
        }}
      >
        <DialogTrigger asChild>
          <Button className="bg-blue-700/60 text-white hover:bg-blue-900">Create space</Button>
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
                      <Input
                        placeholder="space name"
                        {...field}
                        
                      />
                    </FormControl>
                    <FormDescription>This is your Space name</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field: field2 }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="space name  " {...field2} />
                    </FormControl>
                    <FormDescription>Tell about your space</FormDescription>
                  </FormItem>
                )}
              />
              <div>
                <AttachmentButton/>
              </div>
              <div className="flex justify-end gap-x-2">
                <Button type="submit">Submit</Button>
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
