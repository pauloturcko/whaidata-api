import {Request, Response} from "express";
import {CardsRepository} from "../../db/repository/cards-repository";
import {cardValidator} from "../validators/card-validator";
import {ZodError} from "zod";

export class CardsController {
    private cardRepository: CardsRepository;

    constructor() {
        this.cardRepository = new CardsRepository();
    }

    async register (req: Request, res: Response) {
        try {
            const {name, color, cardType, expiresIn } = cardValidator.parse(req.body);

            const registeredCard = await this.cardRepository.create({ name, color, cardType, expiresIn });

            res.status(201).json({
                message: "Card registered successfully",
                registeredCard,
            });
        } catch(error) {
            if(error instanceof ZodError) {
                res.status(400).json({
                    errors: error,
                })
            } else {
                res.status(500).json({ error });
            }
        }
    }
}