import {z} from "zod";
import {CategoryTypeEnum} from "../../db/enum/category-type-enum";

export const createCategoryValidator = z.object({
    name: z
        .string()
        .trim()
        .toLowerCase()
        .min(3),

    icon: z
        .string()
        .trim()
        .min(1)
        .max(50),

    color: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color"),

    type: z.enum(CategoryTypeEnum),
});

export const updateCategoryValidator = createCategoryValidator
    .partial()
    .extend({
        id: z.number(),
    });
