import {Router} from "express";
import {CategoryController} from "../controllers/category-controller";
import {authMiddleware} from "../middlewares/auth-middleware";

const categoryRouter = Router()
const categoryController = new CategoryController()

categoryRouter.post('/register', authMiddleware, (req, res) => categoryController.register(req, res));
categoryRouter.get('/user-categories', authMiddleware, (req, res) => categoryController.loadAll(req, res));
categoryRouter.patch('/update', authMiddleware, (req, res) => categoryController.update(req, res));
categoryRouter.delete('/delete', authMiddleware, (req, res) => categoryController.delete(req, res));

export {categoryRouter};
