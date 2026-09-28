import {Request, Response} from "express";
import {BankAccountService} from "../../services/bank-account-service";
import {handleError} from "../helpers/handle-error";

export class BankAccountController {
    private bankAccountService: BankAccountService;

    constructor() {
        this.bankAccountService = new BankAccountService();
    }

    async register(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const registeredBankAccount = await this.bankAccountService.create(userId, req.body);

            return res.status(201).json({
                message: "Bank account registered successfully",
                registeredBankAccount,
            });
        } catch (error) {
            return handleError(res, error);
        }
    }

    async loadAll(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const bankAccounts = await this.bankAccountService.loadAll(userId);
            return res.status(200).json({bankAccounts});
        } catch (error) {
            return handleError(res, error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const bankAccount = await this.bankAccountService.update(userId, req.body);
            return res.status(200).json({bankAccount});
        } catch (error) {
            return handleError(res, error);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            await this.bankAccountService.delete(userId, req.body);
            return res.status(200).json({message: "Bank account deleted successfully"});
        } catch (error) {
            return handleError(res, error);
        }
    }
}
