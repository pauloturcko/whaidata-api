import {Request, Response} from "express";
import {UsersRepository} from "../../db/repository/users-repository";
import {authValidator} from "../validators/auth-validator";
import {verifyPassword} from "../../utils/hash-password";
import {generateToken} from "../../utils/jwt";
import {ZodError} from "zod";

export class AuthController {
    private userRepository: UsersRepository;

    constructor() {
        this.userRepository = new UsersRepository();
    }

    async authentication(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = authValidator.parse(req.body);
            const user = await this.userRepository.loadByEmail(email);
            if (!user) {
                res.status(401).json({
                    message: 'Unauthorized',
                });
                return;
            }

            const isPasswordValid = await verifyPassword(password, user?.password as string);
            if (!isPasswordValid) {
                res.status(401).json({
                    message: 'Unauthorized',
                });
                return;
            }

            const token = generateToken(user?.id)
            res.status(200).json({
                token,
            })
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    error: error,
                });
            } else {
                res.status(500).json({
                    error,
                });
            }
        }
    }
}
