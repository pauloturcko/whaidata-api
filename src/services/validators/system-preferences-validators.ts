import z from "zod";
import { ThemeEnum } from "../../db/enum/theme-enum";
import { LanguagesEnum } from "../../db/enum/languages-enum";
import { CurrencyEnum } from "../../db/enum/currency-enum";

export const updateSystemPreferencesValidator = z.object({
    theme: z.enum(ThemeEnum).optional(),
    language: z.enum(LanguagesEnum).optional(),
    currency: z.enum(CurrencyEnum).optional(),
})