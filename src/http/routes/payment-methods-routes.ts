import {Router} from "express";
import {PaymentMethodsController} from "../controllers/payment-methods-controller";
import {authMiddleware} from "../middlewares/auth-middleware";

const paymentMethodsRouter = Router()
const paymentMethodsController = new PaymentMethodsController()

paymentMethodsRouter.get('/list', authMiddleware, (req, res) => paymentMethodsController.list(req, res));
paymentMethodsRouter.patch("/:id/update-preferences", authMiddleware, (req, res) => paymentMethodsController.toggle(req, res))

export {paymentMethodsRouter};