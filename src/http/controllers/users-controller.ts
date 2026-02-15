import {UsersRepository} from "../../db/repository/users-repository";
import {registerValidator} from "../validators/register-validator";
import {ZodError} from "zod";
import type {Request, Response} from "express";

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

            const createdUser = await this.userRepository.create({email: email, name: name, password: password});

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
}}
