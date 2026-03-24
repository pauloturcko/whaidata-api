import {PaymentMethodsService} from "../../services/payment-methods-service";
import {Request, Response} from "express";
import {ZodError} from "zod";
import {GenericError} from "../../errors";

export class PaymentMethodsController {
    private paymentMethodsService: PaymentMethodsService

    constructor() {
        this.paymentMethodsService = new PaymentMethodsService()
    }

    async register(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const paymentMethod = await this.paymentMethodsService.create(userId, req.body)

            return res.status(201).json({
                message: "Payment method registered successfully",
                paymentMethod,
            });

        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({error: error.message});
            } else if (error instanceof GenericError) {
                return res.status(409).json({message: error.message});
            } else {
                return res.status(500).json({error});
            }
        }
    }
}
