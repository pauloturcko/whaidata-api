import {z} from "zod";
import {CardTypeEnum} from "../../db/enum/card-type-enum";
import {CardFlagEnum} from "../../db/enum/card-flag-enum";

export const createCardValidator = z.object({
    name: z
        .string()
        .min(3)
        .transform((value) => value.trim().toLowerCase()),

    cardType: z.nativeEnum(CardTypeEnum),

    cardFlag: z
        .coerce
        .string()
        .regex(/^(visa|mastercard|elo|1|2|3)$/i, "Flag de cartão inválida")
        .transform((value) => {
            const lower = value.toLowerCase();
            if (lower === "visa" || lower === "1") return CardFlagEnum.visa;
            if (lower === "mastercard" || lower === "2") return CardFlagEnum.mastercard;
            if (lower === "elo" || lower === "3") return CardFlagEnum.elo;
            return Number(value) as CardFlagEnum;
        }),

    limit: z
        .coerce
        .string()
        .regex(
            /^(\d{1,3}(\.\d{3})*(,\d{1,2})?|\d{1,3}(,\d{3})*(\.\d{1,2})?|\d+([.,]\d{1,2})?)$/,
            "Limite inválido"
        )
        .transform((value) => {
            if (value.includes(",") && value.includes(".")) {
                if (value.indexOf(".") < value.indexOf(",")) {
                    // Brazilian format: 8.000,00
                    return Number(value.replace(/\./g, "").replace(",", "."));
                } else {
                    // US format: 8,000.00
                    return Number(value.replace(/,/g, ""));
                }
            }
            if (value.includes(",")) {
                return Number(value.replace(",", "."));
            }
            return Number(value);
        })
        .refine((value) => !isNaN(value) && value >= 100, "O limite deve ser no mínimo 100,00"),

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
            const currentMonthStart = new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );
            return date >= currentMonthStart;
        }, "Cartão inválido"),

    lastFourDigits: z
        .string()
        .regex(/^\d{4}$/, "Cartão inválido"),
});

export const updateCardValidator = createCardValidator
    .partial()
    .extend({
        id: z.number(),
    });
