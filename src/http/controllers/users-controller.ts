import {ZodError} from "zod";
import type {Request, Response} from "express";
import {UsersService} from "../../services/users-service";
import {GenericError, UnauthorizedError} from "../../errors";

export class UsersController {
    private userService: UsersService;

    constructor() {
        this.userService = new UsersService();
    }

    async register(req: Request, res: Response) {
        try {
            const result = await this.userService.register(req.body);

            res.status(201).json({
                message: "User registered successfully",
                result,
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

async getLoggedUser(req: Request, res: Response) {
    try {
        const {user} = req;

        if (!user) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const savedUser = await this.userService.getLoggedUser(user.id);

        return res.status(200).json({
            user: {
                id: savedUser.user.id,
                name: savedUser.user.name,
                email: savedUser.user.email,
                createdAt: savedUser.user.createdAt,
                profilePicture: savedUser.user.profilePicture,
            },
            systemPreferences: savedUser.systemPreferences,
            paymentPreferences: savedUser.paymentPreferences,
        });
    } catch (error) {
        if (error instanceof UnauthorizedError) {
            return res.status(401).json({message: "Unauthorized"});
        }

        return res.status(500).json({error});
    }
}
}
