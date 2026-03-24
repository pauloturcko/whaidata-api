import {z} from "zod";

export const authValidator = z.object({
    email: z.email(),
    password: z.string().min(8),
})