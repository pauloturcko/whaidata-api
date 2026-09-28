import {Router} from "express";
import {BankAccountController} from "../controllers/bank-account-controller";
import {authMiddleware} from "../middlewares/auth-middleware";

const bankAccountRouter = Router()
const bankAccountController = new BankAccountController()

bankAccountRouter.post('/register', authMiddleware, (req, res) => bankAccountController.register(req, res));
bankAccountRouter.get('/user-bank-accounts', authMiddleware, (req, res) => bankAccountController.loadAll(req, res));
bankAccountRouter.patch('/update', authMiddleware, (req, res) => bankAccountController.update(req, res));
bankAccountRouter.delete('/delete', authMiddleware, (req, res) => bankAccountController.delete(req, res));

export {bankAccountRouter};
