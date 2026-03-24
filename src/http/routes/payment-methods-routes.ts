import {Router} from "express";
import {PaymentMethodsController} from "../controllers/payment-methods-controller";
import {authMiddleware} from "../middlewares/auth-middleware";

const paymentMethodsRouter = Router()
const paymentMethodsController = new PaymentMethodsController()

paymentMethodsRouter.post('/register', authMiddleware, (req, res) => paymentMethodsController.register(req, res));

export {paymentMethodsRouter};