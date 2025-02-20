"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { useEffect } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useRouter } from "next/navigation";

interface SearchdialogProps {
  setIsOpen: (open: boolean) => void;
}

export default function Searchdialog({ setIsOpen }: SearchdialogProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsOpen]);

  return (
    <Dialog open onOpenChange={setIsOpen}>
      <DialogContent className="bg-neutral-950  border border-neutral-700/[0.2] p-4 rounded-md flex flex-col space-y-2 cursor-pointer">
        <Command>
          <CommandInput placeholder="Type a command or search" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onClick={() => router.push("/profile")}>
                Profile
              </CommandItem>
              <CommandItem onClick={() => router.push("/settings")}>
                Settings
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
