import {Request, Response} from "express";
import {CategoryService} from "../../services/category-service";
import {handleError} from "../helpers/handle-error";

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    async register(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const registeredCategory = await this.categoryService.create(userId, req.body);

            return res.status(201).json({
                message: "Category registered successfully",
                registeredCategory,
            });
        } catch (error) {
            return handleError(res, error);
        }
    }

    async loadAll(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const categories = await this.categoryService.loadAll(userId);
            return res.status(200).json({categories});
        } catch (error) {
            return handleError(res, error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const category = await this.categoryService.update(userId, req.body);
            return res.status(200).json({category});
        } catch (error) {
            return handleError(res, error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            await this.categoryService.delete(userId, req.body);
            return res.status(200).json({message: "Category deleted successfully"});
        } catch (error) {
            return handleError(res, error);
        }
    }
}
