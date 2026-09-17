import { CurrencyEnum } from "../enum/currency-enum";
import { LanguagesEnum } from "../enum/languages-enum";
import { ThemeEnum } from "../enum/theme-enum";

export interface CreateUserSystemPreferences {
    userId: number,
    language?: LanguagesEnum;
    currency?: CurrencyEnum;
    theme?: ThemeEnum;
}

export interface UserSystemPreferences {
    language?: LanguagesEnum;
    currency?: CurrencyEnum;
    theme?: ThemeEnum;
}