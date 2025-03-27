import { Data } from "emoji-mart";
import Picker from "@emoji-mart/react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Smile } from "lucide-react";

interface EmojiPickerProps {
  
  onChange: (e: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EmojiPicker({
  onChange,
}: {
  onChange: (e: string) => void;
}) {
 
  return (
    <Popover   defaultOpen={false}>
      <PopoverTrigger >
        <div className="hover:bg-neutral-900 box-shadow-md ">
          <Smile size={20} className="text-neutral-300 opacity-90" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-trasnparent border-none">
        <Picker
          data={Data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
}
