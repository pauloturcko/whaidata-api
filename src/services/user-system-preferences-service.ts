import { UserSystemPreferencesRepository } from "../db/repository/user-system-preferences-repository";
import { GenericError } from "../errors";
import { updateSystemPreferencesValidator } from "./validators/system-preferences-validators";

export class UserSystemPreferencesService {
    private userSystemPreferencesRepository: UserSystemPreferencesRepository

    constructor() {
        this.userSystemPreferencesRepository = new UserSystemPreferencesRepository()
    }

    async updatePreference(userId: number, data: unknown) {
        const parsedData = updateSystemPreferencesValidator.parse(data)
        
        const preference = await this.userSystemPreferencesRepository.loadByUserId(userId)
        if (!preference) {
            throw new GenericError("Preferences not found")
        }

        Object.assign(preference, parsedData)

        return await this.userSystemPreferencesRepository.save(preference)
    }
}