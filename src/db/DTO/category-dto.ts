import { CategoryTypeEnum } from "../enum/category-type-enum";

export interface CreateCategoryDto {
    userId: number;
    name: string;
    icon: string;
    color: string;
    type: CategoryTypeEnum;
}