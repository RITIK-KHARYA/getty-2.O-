"use client";

import * as React from "react";
import { Check, Circle, Edit, LogOut, Settings, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/app/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useSession } from "@/app/lib/auth-client";

type StatusType = "online" | "idle" | "dnd" | "invisible" | "custom";

interface StatusOption {
  value: StatusType;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const statusOptions: StatusOption[] = [
  {
    value: "online",
    label: "Online",
    icon: <Circle className="h-3 w-3 fill-emerald-500 text-emerald-500" />,
    color: "bg-emerald-500",
  },
  {
    value: "idle",
    label: "Idle",
    icon: <Circle className="h-3 w-3 fill-amber-500 text-amber-500" />,
    color: "bg-amber-500",
  },
  {
    value: "dnd",
    label: "Do Not Disturb",
    icon: <Circle className="h-3 w-3 fill-rose-500 text-rose-500" />,
    color: "bg-rose-500",
  },
  {
    value: "invisible",
    label: "Invisible",
    icon: <Circle className="h-3 w-3 fill-slate-500 text-slate-500" />,
    color: "bg-slate-500",
  },
  {
    value: "custom",
    label: "Custom Status",
    icon: <Edit className="h-3 w-3" />,
    color: "bg-primary",
  },
];

interface UserProfileDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function UserProfileDialog({
  children,
  open,
  onOpenChange,
}: UserProfileDialogProps) {
  const [status, setStatus] = React.useState<StatusType>("online");
  const [customStatus, setCustomStatus] = React.useState("");
  const [statusMenuOpen, setStatusMenuOpen] = React.useState(false);

  const user = useSession()

  const currentStatus = statusOptions.find((option) => option.value === status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <div className="relative -mt-6 -mx-6 h-32 rounded-t-lg bg-gradient-to-r from-primary/20 to-primary/40">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 h-8 w-8 rounded-full bg-black/20 text-white hover:bg-black/40"
            onClick={() => onOpenChange?.(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="absolute -bottom-12 left-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user.data?.user.image || "https://github.com/shadcn.png"} alt={user.data?.user.name} />
                <AvatarFallback className="text-xl">AJ</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0">
                <DropdownMenu
                  open={statusMenuOpen}
                  onOpenChange={setStatusMenuOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full border-2 border-background bg-background"
                    >
                      <div
                        className={cn(
                          "h-3 w-3 rounded-full",
                          currentStatus?.color
                        )}
                      />
                      <span className="sr-only">Change status</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {statusOptions.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        className={cn(
                          "flex items-center gap-2",
                          status === option.value && "bg-accent"
                        )}
                        onClick={() => {
                          setStatus(option.value);
                          if (option.value !== "custom") {
                            setStatusMenuOpen(false);
                          }
                        }}
                      >
                        {option.icon}
                        <span>{option.label}</span>
                        {status === option.value && (
                          <Check className="ml-auto h-4 w-4" />
                        )}
                      </DropdownMenuItem>
                    ))}
                    {status === "custom" && (
                      <>
                        <DropdownMenuSeparator />
                        <div className="p-2">
                          <Input
                            placeholder="What's happening?"
                            value={customStatus}
                            onChange={(e) => setCustomStatus(e.target.value)}
                            className="h-8 text-sm"
                          />
                          <div className="mt-2 flex justify-between">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2 text-xs"
                              onClick={() => {
                                setStatus("online");
                                setCustomStatus("");
                                setStatusMenuOpen(false);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 px-2 text-xs"
                              onClick={() => setStatusMenuOpen(false)}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">{user.data?.user.name}</h2>
            <p className="text-sm text-muted-foreground">
              {user.data?.user.email}
              {/* {user.tag} */}
            </p>
          </div>

          <Separator />

          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="settings">User Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-4 pt-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  ABOUT ME
                </h3>
                {/* <p className="mt-1 text-sm">{user.about}</p> */}
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  MEMBER SINCE
                </h3>
                {/* <p className="mt-1 text-sm">{user.data?.user.createdAt }</p> */}
              </div>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" defaultValue={user.data?.user.name} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="about">About Me</Label>
                {/* <Textarea id="about" defaultValue={user.data?.user.about} /> */}
              </div>

              <Button className="w-full">Save Changes</Button>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex flex-col sm:flex-col">
          <Button variant="outline" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" />
            User Settings
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
