import {Repository} from "typeorm";
import {appDataSource} from "../config/data-source";
import {Cards} from "../models/cards";
import {RegisterCardTypeDto} from "../DTO/cards-dto";

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

    async create(data: RegisterCardTypeDto): Promise<Cards> {
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
}