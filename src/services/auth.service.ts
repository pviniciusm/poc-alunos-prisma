import repository from "../database/prisma.connection";
import { v4 as createToken } from "uuid";

export class AuthService {
    public async login(email: string, password: string) {
        const result = await repository.aluno.findUnique({
            where: {
                email,
                password,
            },
        });

        console.log(result);

        if (!result) {
            return null;
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

        return token;
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
