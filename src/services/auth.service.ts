import { Result } from "../dtos/service.dto";
import repository from "../database/prisma.connection";
import jwtService from "./jwt.service";

export class AuthService {
    public async login(email: string, password: string): Promise<Result> {
        const result = await repository.aluno.findUnique({
            where: {
                email,
                password,
            },
        });

        if (!result) {
            return {
                code: 401,
                message: "Invalid credentials",
            };
        }

        const token = jwtService.create({
            id: result.id,
            nome: result.nome,
        });

        return {
            code: 200,
            message: "Login successfuly done",
            data: {
                id: result.id,
                token,
            },
        };
    }
}
