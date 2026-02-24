import {Router} from "express";
import {CardsController} from "../controllers/cards-controller";

const cardRouter = Router()
const cardController = new CardsController()

cardRouter.post('/register', (req, res) => cardController.register(req, res));

export {cardRouter};