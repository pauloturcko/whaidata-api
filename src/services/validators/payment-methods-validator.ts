import {z} from "zod";

export const createPaymentMethodValidator = z.object({
    name: z
        .string()
        .min(3)
        .transform((value) => value.trim().toLowerCase()),

    color: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color"),
})