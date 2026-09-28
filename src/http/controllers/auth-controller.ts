import type {Request, Response} from "express";
import {AuthService} from "../../services/auth-service";
import {handleError} from "../helpers/handle-error";

export class AuthController {
    private authService = new AuthService();

    async authentication(req: Request, res: Response) {
        try {
            const result = await this.authService.authentication(req.body);

            return res.status(200).json(result);

        } catch (error) {
            return handleError(res, error);
        }
    }
}