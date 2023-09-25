import { Result } from "../contracts/service.contract";
import repository from "../database/prisma.connection";
import { v4 as createToken } from "uuid";

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

        const token = createToken();

        await repository.aluno.update({
            where: {
                id: result.id,
            },
            data: {
                authToken: token,
            },
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

    public async validateToken(token: string): Promise<boolean> {
        const user = await repository.aluno.findFirst({
            where: {
                authToken: token,
            },
        });

        return !!user;
    }
}
