import { Repository } from "typeorm";
import { Category } from "../models/category";
import { appDataSource } from "../config/data-source";
import { CreateCategoryDto, UpdateCategoryDto } from "../DTO/category-dto";

type UniqueCategory = {
    userId: number,
    name: string
}
// TODO: Revisar todos os repositories e remover tipagens locais

export class CategoryRepository {
    private repsitory: Repository<Category>

    constructor() {
        this.repsitory = appDataSource.getRepository(Category)
    }

    async create(data: CreateCategoryDto) {
        await this.repsitory.save(data)
    }

    async findByUnique({userId, name}: UniqueCategory) {
        return await this.repsitory.findOne({
            where: {
                userId,
                name
            }
        })
    }

    async loadAll(userId: number): Promise<Category[]> {
        return await this.repsitory.find({where: {userId}})
    }

    async loadById(id: number): Promise<Category | null> {
        return await this.repsitory.findOne({where: {id}})
    }

    async update(data: UpdateCategoryDto) {
        return await this.repsitory.save({...data})
    }

    async delete(id: number): Promise<void> {
        await this.repsitory.delete({id})
    }
}