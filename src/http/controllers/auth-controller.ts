import type {Request, Response} from "express";
import {ZodError} from "zod";
import {AuthService} from "../../services/auth-service";
import {UnauthorizedError} from "../../errors";

export class AuthController {
    private authService = new AuthService();

    async authentication(req: Request, res: Response) {
        try {
            const result = await this.authService.authentication(req.body);

            return res.status(200).json(result);

        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ errors: error });
            }

            if (error instanceof UnauthorizedError) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            return res.status(500).json({ error });
        }
    }
}