import {z} from "zod";
import {AccountTypeEnum} from "../../db/enum/account-type-enum";

const balanceValidator = z
    .coerce
    .string()
    .regex(
        /^-?(\d{1,3}(\.\d{3})*(,\d{1,2})?|\d{1,3}(,\d{3})*(\.\d{1,2})?|\d+([.,]\d{1,2})?)$/,
        "Saldo inválido"
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
    .refine((value) => !isNaN(value), "Saldo inválido")
    .transform((value) => value.toFixed(2));

export const createBankAccountValidator = z.object({
    name: z
        .string()
        .trim()
        .toLowerCase()
        .min(3),

    accountType: z.enum(AccountTypeEnum),

    balance: balanceValidator.default("0.00"),
});

export const updateBankAccountValidator = createBankAccountValidator
    .partial()
    .extend({
        id: z.number(),
        balance: balanceValidator.optional(),
    });
