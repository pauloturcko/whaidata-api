import { Category } from "../db/models/category";
import { CategoryRepository } from "../db/repository/category-repository";
import { ForbiddenError, GenericError, NotFoundError } from "../errors";
import { createCategoryValidator, updateCategoryValidator } from "./validators/category-validator";

export class CategoryService {
    private categoryRepository = new CategoryRepository();

    async create(userId: number, data: unknown) {
        const {name, icon, color, type} = createCategoryValidator.parse(data)
        
        const normalizedName = name.trim().toLocaleLowerCase()

        const existingCategory = await this.categoryRepository.findByUnique({userId, name: normalizedName})
        
        if(existingCategory) {
            throw new GenericError("This category already exists!")
        }

        return await this.categoryRepository.create({
            userId,
            name: normalizedName,
            icon,
            color,
            type
        })
    }

    async loadAll(userId: number): Promise<Category[]> {
        return await this.categoryRepository.loadAll(userId)
    }

    async update(userId: number, data: unknown): Promise<Category> {
        const parsedData = updateCategoryValidator.parse(data)

        const category = await this.categoryRepository.loadById(parsedData.id)
        if(!category) throw new NotFoundError("Category does not exist!")
        if(category.userId !== userId) throw new ForbiddenError();

        if(parsedData.name) {
            parsedData.name = parsedData.name.trim().toLocaleLowerCase();
        }

        const updateCategoryData = {
            ...category,
            ...parsedData
        }

        const existingCategory = await this.categoryRepository.findByUnique({
            userId,
            name: updateCategoryData.name
        })

        if(existingCategory && existingCategory.id !== category.id) {
            throw new GenericError("This category already exists!")
        }

        return await this.categoryRepository.update(updateCategoryData)
    }

    async delete(userId: number, id: number): Promise<void> {
        const category = await this.categoryRepository.loadById(id)
        if(!category) throw new NotFoundError("Category does not exist!")
        if(category.userId !== userId) throw new ForbiddenError();

        return await this.categoryRepository.delete(id)
    }
}   