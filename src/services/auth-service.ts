import {authValidator} from "../http/validators/auth-validator";
import {verifyPassword} from "../utils/hash-password";
import {generateToken} from "../utils/jwt";
import {UsersRepository} from "../db/repository/users-repository";
import {UnauthorizedError} from "../errors";

export class AuthService {
    private userRepository: UsersRepository;

    constructor() {
        this.userRepository = new UsersRepository();
    }

    async authentication(data: unknown): Promise<{ token: string }> {
        const { email, password } = authValidator.parse(data);

        const user = await this.userRepository.loadByEmail(email);
        if (!user) {
            throw new UnauthorizedError();
        }

        const isPasswordValid = await verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError();
        }

        const token = generateToken(user.id);

        return { token };
    }
}