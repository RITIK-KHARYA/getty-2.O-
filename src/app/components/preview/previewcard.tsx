import { attachment } from "@/actions/cardmediaupload";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/app/lib/utils";
import { X } from "lucide-react";


interface AttachmentPreviewProps {
  Attachment: attachment;
  onRemoveclick: (fileName:string) => void;
  key: string;
}
export default function AttachmentPreview({
  Attachment: { file, mediaId, isUploading },
  onRemoveclick,
  key,
}: AttachmentPreviewProps) {
  console.log("attachment",file);
  const src = URL.createObjectURL(file);
  console.log("src",src);
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
            className=" size-fit max-h-{30rem} rounded-2xl "
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
            className=" absolute right-3 top-3 rounded-full bg-foreground p-1.5 transition-colors hover:bg-muted "
            onClick={()=> onRemoveclick(file.name)}
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
 function AttachmentPreviews({
  attachments,
  onremoveclick,
}: Attachmentpreviewsprops) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2"
      )}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          Attachment={attachment}
          onRemoveclick={() => onremoveclick(attachment.file.name)}
        />
      ))}
    </div>
  );
}
