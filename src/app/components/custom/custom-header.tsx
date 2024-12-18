"use client";

import SearchDemo from "./custom-search";
import { Button } from "../ui/button";
import { ProfileForm } from "./custom-dialog";
import FindSpaceDialog from "../findspacedialog/findspacedialog";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface HeaderProps {}

export default function Header() {
  return (
    <div className="sticky top-0 h-[60px] ">
      <div className="flex items-center h-full justify-end px-4 gap-x-5 ">
        <div className="flex gap-2 ">
          <div className="flex">
            <Searchkeydown>
              <SearchDemo />
            </Searchkeydown>
          </div>
          <ProfileForm />
          <FindSpaceDialog />
        </div>
      </div>
    </div>
  );
}

interface SearchKeydownProps {
  children: React.ReactNode
}

export function Searchkeydown(
  { children }: SearchKeydownProps
) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((open) => !open);
  }
  return (
    <div>
      <Dialog defaultOpen={open} onOpenChange={handleClick}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              {children}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
