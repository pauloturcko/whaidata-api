import {UsersRepository} from "../db/repository/users-repository";
import {registerValidator} from "../http/validators/register-validator";
import {Users} from "../db/models/users";
import {GenericError} from "../errors";
import {hashPassword} from "../utils/hash-password";

export class UsersService {
    private userRepository: UsersRepository;

    constructor() {
        this.userRepository = new UsersRepository();
    }

    async register(data: unknown): Promise<Users> {
        const {name, password, email} = registerValidator.parse(data);

        const emailInUse = await this.userRepository.loadByEmail(email);
        if (emailInUse) {
            throw new GenericError('Email already exists');
        }

        const hashedPassword = await hashPassword(password);
        return await this.userRepository.create({
            email,
            name,
            password: hashedPassword
        });
    }

    async getLoggedUser(userId: number): Promise<Users> {
        const user = await this.userRepository.loadById(userId);

        if (!user) {
            throw new GenericError("Unauthorized");
        }

        return user;
    }
}