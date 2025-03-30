// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/app/components/ui/avatar";
// import { Input } from "@/app/components/ui/input";
// import { Skeleton } from "@/app/components/ui/skeleton";
// import { useSession } from "@/app/lib/auth-client";
// import { Search } from "lucide-react";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/app/components/ui/form";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useState } from "react";
// import { SearchUser } from "@/actions/user";

// export default function SearchChat() {
//   const user = useSession();
//   if (!user) {
//     console.log("unauthenticated");
//     return;
//   }
//   //   const formSchema = z.object({
//   //     name: z.string().min(2).max(10),
//   //   });

//   //   const form = useForm<z.infer<typeof formSchema>>({
//   //     resolver: zodResolver(formSchema),
//   //     defaultValues: {
//   //       name: "",
//   //     },
//   //   });
//   //   <Form {...form}>
//   //     <FormField
//   //       control={form.control}
//   //       name="name"
//   //       render={({ field }) => (
//   //         <FormItem>
//   //           <FormLabel className="text-white">Search</FormLabel>
//   //           <FormControl>
//   //             <div className="relative w-full">
//   //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
//   //               <Input placeholder="Search" {...field} className="pl-10" />
//   //             </div>
//   //           </FormControl>
//   //           <FormMessage />
//   //         </FormItem>
//   //       )}
//   //     />
//   //   </Form>;
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const value = async (search: string) => {};
//   }, []);

//   const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(search);
//     const data = async (search: string) => {
//       await SearchUser(search);
//     };
//   };

//   useEffect(() => {
//     const keydown = (e: KeyboardEvent) => {
//       if (e.key === "Enter") {
//         handleSubmit();
//       }
//     //   return () => {};
//     };
//   });

//   return (
//     <div>
//       <div className="relative w-full">
//         <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
//         <Input
//           placeholder="Search"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="pl-10"
//         />
//       </div>
//     </div>
//   );
// }
