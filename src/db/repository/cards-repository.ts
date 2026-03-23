import {Repository} from "typeorm";
import {appDataSource} from "../config/data-source";
import {Cards} from "../models/cards";
import {CreateCardDto, UpdateCardDTO} from "../DTO/cards-dto";

type UniqueCard = {
    userId: number,
    name: string,
    lastFourDigits: string,
}

export class CardsRepository {
    private repository: Repository<Cards>;

    constructor() {
        this.repository = appDataSource.getRepository(Cards);
    }

    async create(data: CreateCardDto): Promise<Cards> {
        return await this.repository.save(data);
    }

    async findByUniqueFields(params: UniqueCard) {
        return this.repository.findOne({
            where: {
                userId: params.userId,
                name: params.name,
                lastFourDigits: params.lastFourDigits,
            },
        });
    }

    async loadAll(userId: number): Promise<Cards[]> {
        return await this.repository.find({where: {userId}});
    }

    async loadById(id: number): Promise<Cards | null> {
        return await this.repository.findOne({where: {id}})
    }

    async update(data: UpdateCardDTO): Promise<Cards> {
        return await this.repository.save({...data});
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete({id})
    }
}
