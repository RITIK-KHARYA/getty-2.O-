// "use client";

// import Placeholder from "@tiptap/extension-placeholder";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";

// interface TiptapProps {
//   placeholder: string;
// }

// const Tiptap = ({ placeholder }: TiptapProps) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Placeholder.configure({
//         // Use a placeholder:
//         placeholder: "Write something …",
//         // Use different placeholders depending on the node type:
//         // placeholder: ({ node }) => {
//         //   if (node.type.name === 'heading') {
//         //     return 'What’s the title?'
//         //   }

//         //   return 'Can you add some further context?'
//         // },
//       }),
//     ],
//   });

//   return <EditorContent placeholder={placeholder} editor={editor} />;
// };

// export default Tiptap;
