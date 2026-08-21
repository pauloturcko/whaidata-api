import {Router} from "express";
import {PaymentMethodsController} from "../controllers/payment-methods-controller";
import {authMiddleware} from "../middlewares/auth-middleware";

const paymentMethodsRouter = Router()
const paymentMethodsController = new PaymentMethodsController()

paymentMethodsRouter.get('/list', authMiddleware, (req, res) => paymentMethodsController.list(req, res));

export {paymentMethodsRouter};