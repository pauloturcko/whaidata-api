import {CardsRepository} from "../db/repository/cards-repository";
import {createCardValidator, updateCardValidator} from "./validators/card-validator";
import {GenericError} from "../errors";
import {Cards} from "../db/models/cards";

export class CardsService {
    private cardsRepository = new CardsRepository();

    async create(userId: number, data: unknown) {
        const {name, limit, cardType, cardFlag, expiresIn, lastFourDigits} =
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
            cardType,
            limit,
            cardFlag,
            expiresIn,
            lastFourDigits,
        });
    }

    async loadAll(userId: number): Promise<Cards[]> {
        return await this.cardsRepository.loadAll(userId);
    }

    async update(userId: number, data: unknown): Promise<Cards> {
        const parsedData = updateCardValidator.parse(data);

        const card = await this.cardsRepository.loadById(parsedData.id);
        if (!card) throw new GenericError('Card does not exist!');
        if (card.userId !== userId) throw new GenericError('Unauthorized');

        if (parsedData.name) {
            parsedData.name = parsedData.name.trim().toLowerCase();
        }

        const updatedCardData = {
            ...card,
            ...parsedData
        };

        return await this.cardsRepository.update(updatedCardData);
    }

    async delete(userId: number, id: number): Promise<void> {
        const card = await this.cardsRepository.loadById(id);
        if (!card) throw new GenericError('Card does not exist!');
        if (card.userId !== userId) throw new GenericError('Unauthorized');

        return await this.cardsRepository.delete(id);
    }
}
