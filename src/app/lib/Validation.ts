"use client";

import { z } from "zod";

export const formSchema = z.object({
  spacename: z.string().min(2).max(50),
});
export const mediaSchema = z.object({

})
export const formSchema2 = z.object({
  spacename: z.string().min(2).max(50),
});
