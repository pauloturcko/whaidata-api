import {CardsRepository} from "../db/repository/cards-repository";
import {createCardValidator} from "../http/validators/card-validator";
import {GenericError} from "../errors";

export class CardsService {
    private cardsRepository = new CardsRepository();

    async create(userId: number, data: unknown) {
        const {name, color, cardType, expiresIn, lastFourDigits} =
            createCardValidator.parse(data);

        const normalizedName = name.trim().toLowerCase();

        const existingCard = await this.cardsRepository.findByUniqueFields({
            userId,
            name: normalizedName,
            lastFourDigits,
        });

        if (existingCard) {
            throw new GenericError('This card already exists!');
        }

        return await this.cardsRepository.create({
            userId,
            name: normalizedName,
            color,
            cardType,
            expiresIn,
            lastFourDigits,
        });
    }
}