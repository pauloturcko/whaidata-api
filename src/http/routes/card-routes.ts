import {Router} from "express";
import {CardsController} from "../controllers/cards-controller";
import {authMiddleware} from "../middlewares/auth-middleware";

const cardRouter = Router()
const cardController = new CardsController()

cardRouter.post('/register', authMiddleware, (req, res) => cardController.register(req, res));

export {cardRouter};
