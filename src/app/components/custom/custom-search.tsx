"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import Searchdialog from "../event/search";
import { Button } from "../ui/button";

export default function SearchDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="relative w-[200px]">
        <Button
          className="pe-11 rounded-lg border-[1px] border-neutral-700 w-full bg-background hover:bg-black cursor-text"
          onClick={() => setIsOpen(true)}
          variant="outline"
        >
          <p className="w-full text-left">Search</p>
        </Button>
        <div className="absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground">
          <kbd className="inline-flex h-5 max-h-full items-center rounded border border-border px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
            ⌘K
          </kbd>
        </div>
      </div>
      {isOpen && <Searchdialog setIsOpen={setIsOpen} />}
    </div>
  );
}
