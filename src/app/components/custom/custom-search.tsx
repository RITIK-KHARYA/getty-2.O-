"use client";

import { useState } from "react";
import Searchdialog from "../event/search";

export default function SearchDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="relative w-[180px]">
        <div
          className="pe-11 rounded-lg border-[1px] h-9 border-neutral-700 w-full bg-background hover:bg-black cursor-text"
          onClick={() => setIsOpen(true)}
        >
          <p className="w-full text-sm mt-2 mx-2 flex-col items-start justify-center">
            Search
          </p>
        </div>
        <div className="absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground">
          <kbd className="inline-flex h-5 max-h-full items-center rounded border border-border px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
            ⌘K
          </kbd>
        </div>
      </div>
      <Searchdialog open={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
}
