import {z} from "zod";
import {CardTypeEnum} from "../../db/enum/card-type-enum";

export const cardValidator = z.object({
    name: z.string().min(3),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color"),
    cardType: z.enum(CardTypeEnum),
    expiresIn: z
        .string()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato deve ser MM/YY")
        .transform((value) => {
            const [month, year] = value.split("/");
            const fullYear = Number(`20${year}`);
            return new Date(fullYear, Number(month) - 1, 1);
        })
        .refine((date) => {
            const now = new Date();
            const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            return date >= currentMonthStart;
        }, "Cartão Inválido"),
})