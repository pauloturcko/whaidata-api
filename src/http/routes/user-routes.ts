import {Router} from "express";
import {UsersController} from "../controllers/users-controller";

const userRouter = Router()
const userController = new UsersController();

userRouter.post('/register', (req, res) => userController.register(req, res));

export { userRouter };