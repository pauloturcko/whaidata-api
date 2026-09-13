import { Repository } from "typeorm";
import { UserSystemPreferences } from "../models/user-system-preferences";
import { appDataSource } from "../config/data-source";
import { ThemeEnum } from "../enum/theme-enum";
import { LanguagesEnum } from "../enum/languages-enum";
import { CurrencyEnum } from "../enum/currency-enum";

export class UserSystemPreferencesRepository {
    private repository: Repository<UserSystemPreferences>

    constructor() {
        this.repository = appDataSource.getRepository(UserSystemPreferences)
    }

    async createDefaultPreferences(userId: number, theme: ThemeEnum, language: LanguagesEnum, currency: CurrencyEnum) {
        return await this.repository.save({
            userId,
            theme,
            language,
            currency
        })
    }

    async loadByUserId(userId: number): Promise<UserSystemPreferences | null> {
        return await this.repository.findOne({
            where: {userId},
            relations: {
                user: true
            }
        })
    }

    async save(pref: UserSystemPreferences): Promise<UserSystemPreferences> {
        return await this.repository.save(pref)
    }
}