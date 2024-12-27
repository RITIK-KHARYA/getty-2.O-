// "use server";
// import prisma from "@/app/lib";

// import { UTApi } from "uploadthing/server";

// export default async function deleteAttachment(fileName: string) {
//   try {
//     if (!fileName) {
//       console.log("there is no file to delete");
//     }
//     const removebanner = await prisma.space.findFirst({
//       select: {
//         banner: true,
//       },
//       where: {
//         banner: fileName,
//       },
//     });
//     if (removebanner?.banner) {
//       console.log("banner to delete", removebanner.banner);
//     }
//     console.log(fileName, "file to delete");
//     await new UTApi().deleteFiles(fileName.split("/f/"));
//   } catch (error) {
//     throw new Error("unable to delete attachment");
//   }
// }


// cannot be done because the for the filename there is no url existing and for the url you are required to have banner and for banner you must have the space and space is created after the submitting the form so totally fucked up sutiation 


