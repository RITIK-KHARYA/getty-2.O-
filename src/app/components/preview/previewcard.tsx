import { attachment } from "@/actions/mediaUpload";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/app/lib/utils";
import { X } from "lucide-react";

interface AttachmentPreviewProps {
  Attachment: attachment;
  onRemoveclick: (fileName: string) => void;
  key: string;
}
export default function AttachmentPreview({
  Attachment: { file, mediaId, isUploading },
  onRemoveclick,
  key,
}: AttachmentPreviewProps) {
  const src = URL.createObjectURL(file);
  return (
    <>
      <div
        key={key}
        className={cn(
          "relative mx-auto size-fit ",
          isUploading && "opacity-50"
        )}
      >
        {file.type.startsWith("image") ? (
          <Image
            className=" size-fit max-h-{30rem} rounded-none "
            src={src}
            width={500}
            height={500}
            alt="attachment preview"
          />
        ) : (
          <video controls className="size-fit max-h-{30rem} rounded-2xl ">
            <source src={src} type={file.type} />
          </video>
        )}
        {!isUploading && (
          <Button
            className="absolute right-0 top-0 rounded-full hover:bg-neutral-300 bg-foreground p-2 transition-colors"
            onClick={() => onRemoveclick(file.name)}
          >
            <X size={20} className="hover:text-foreground" />
          </Button>
        )}
      </div>
    </>
  );
}
interface Attachmentpreviewsprops {
  attachments: attachment[];
  onremoveclick: (filename: string) => void;
}
export function AttachmentPreviews({
  attachments,
  onremoveclick,
}: Attachmentpreviewsprops) {
  return (
    <div className=" gap-3">
      {attachments.length > 4 ? (
        <div className="text-destructive text-red-400 text-xs font-semibold text-center">too many files</div>
      ) : (
        attachments.map((attachment) => (
          <AttachmentPreview
            key={attachment.file.name}
            Attachment={attachment}
            onRemoveclick={() => onremoveclick(attachment.file.name)}
          />
        ))
      )}
    </div>
  );
}
