import {Request, Response} from "express";
import {ZodError} from "zod";
import {CardsService} from "../../services/cards-service";
import {GenericError} from "../../errors";

export class CardsController {
    private cardService: CardsService;

    constructor() {
        this.cardService = new CardsService();
    }

    async register(req: Request, res: Response) {
        try {
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const registeredCard = await this.cardService.create(userId, req.body);

            res.status(201).json({
                message: "Card registered successfully",
                registeredCard,
            });
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    errors: error,
                })
            } else if (error instanceof GenericError) {
                res.status(409).json({
                    message: error.message,
                })
            } else {
                res.status(500).json({error});
            }
        }
    }

    async loadAll(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const cards = await this.cardService.loadAll(Number(userId))
            res.status(200).json({cards})
        } catch (error) {
            res.status(500).json({error});
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const card = await this.cardService.update(userId, req.body)
            res.status(200).json({card})
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    errors: error,
                })
            } else if (error instanceof GenericError) {
                res.status(409).json({
                    message: error.message,
                })
            } else {
                res.status(500).json({error});
            }
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({message: "Unauthorized"});
            }

            const cards = await this.cardService.delete(Number(userId), req.body.id);
            res.status(200).json({message: "Card deleted successfully", cards})
        } catch (error) {
            res.status(500).json({error});
        }
    }
}
