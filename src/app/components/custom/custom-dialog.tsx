"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Sparkles } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import AttachmentButton from "@/app/example-uploader/uploadarea";
import { CreateSpace } from "@/actions/space";

export const formSchema = z.object({
  spacename: z.string().min(2, {
    message: "Space name must be at least 2 characters.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  banner: z.string().min(0, "required"),
});

export function SpaceForm() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spacename: "",
      bio: "",
      banner: "",
    },
  });

  const bannerUrl = form.watch("banner");

  const submitValues = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await CreateSpace(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setOpen(false);
      form.reset();
    }
  };

  useEffect(() => {
    if (bannerUrl) {
      setIsUploading(false);
      return;
    }
    setIsUploading(true);
  }, [bannerUrl]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen((open) => !open);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-violet-700 text-bold text-center text-white rounded-md px-4 py-2 transition-all duration-200 shadow-sm"
        >
          Create Space
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold tracking-tight">
            Create New Space
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitValues)}
            className="space-y-6 py-2"
          >
            <FormField
              control={form.control}
              name="spacename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Space Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter space name"
                      {...field}
                      className="focus-visible:ring-primary/70"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">
                    This will be the public name of your space
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your space..."
                      {...field}
                      className="min-h-24 resize-none focus-visible:ring-primary/70"
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">
                    Tell others what your space is all about
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-medium">
                    Banner Image
                  </FormLabel>
                  <FormControl>
                    <div className="border border-dashed border-muted-foreground/30 rounded-lg p-4 transition-colors hover:bg-muted/50">
                      <AttachmentButton
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">
                    Upload an image to represent your space
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || isUploading}
                className="font-medium"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles size={16} className="mr-1" />
                    Create 
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
