import {UsersRepository} from "../../db/repository/users-repository";
import {registerValidator} from "../validators/register-validator";
import {ZodError} from "zod";
import type {Request, Response} from "express";
import {hashPassword} from "../../utils/hash-password";

export class UsersController {
    private userRepository: UsersRepository;

    constructor() {
        this.userRepository = new UsersRepository();
    }

    async register(req: Request, res: Response) {
        try {
            const {name, email, password} = registerValidator.parse(req.body);

            const emailInUse = await this.userRepository.loadByEmail(email);
            if(emailInUse) {
                res.status(409).json({message: "Email already exists"});
                return
            }

            const hashedPassword = await hashPassword(password);
            const createdUser = await this.userRepository.create({email: email, name: name, password: hashedPassword});

            res.status(201).json({
                message: "User registered successfully",
                createdUser,
            });
        } catch (error) {
            if(error instanceof ZodError) {
                res.status(400).json({
                    errors: error,
                })
            } else {
                res.status(500).json({ error });
        }
    }
}

    async getLoggedUser(req: Request, res: Response) {
        const { user } = req;
        if(!user) {
            res.status(401).json({message: "Unauthorized"});
        }

        const savedUser = await this.userRepository.loadById(user?.id)
        if(!savedUser) {
            res.status(401).json({message: "Unauthorized"});
        }

        res.status(200).json({
            id: savedUser?.id,
            name: savedUser?.name,
            email: savedUser?.email,
            createdAt: savedUser?.createdAt,
            profilePicture: savedUser?.profilePicture,
        })
    }
}
