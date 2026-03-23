import {Router} from "express";
import {CardsController} from "../controllers/cards-controller";
import {authMiddleware} from "../middlewares/auth-middleware";

const cardRouter = Router()
const cardController = new CardsController()

cardRouter.post('/register', authMiddleware, (req, res) => cardController.register(req, res));
cardRouter.get('/user-cards', authMiddleware, (req, res) => cardController.loadAll(req, res));
cardRouter.patch('/update', authMiddleware, (req, res) => cardController.update(req, res));
cardRouter.delete('/delete', authMiddleware, (req, res) => cardController.delete(req, res));

export {cardRouter};
