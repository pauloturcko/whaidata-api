import {Users} from "../models/users";
import {appDataSource} from "../config/data-source";
import {Repository} from "typeorm";
import {CreateUsersDto} from "../DTO/users-dto";

export class UsersRepository {
    private repository: Repository<Users>;

    constructor() {
        this.repository = appDataSource.getRepository(Users);
    }

    async create(data: CreateUsersDto): Promise<Users> {
        return await this.repository.save(data);
    }

    async loadByEmail(email: string): Promise<Users | null> {
        return await this.repository.findOne({ where: { email } });
    }
}