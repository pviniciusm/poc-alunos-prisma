import repository from "../database/prisma.connection";

export class AuthService {
    public async validateToken(token: string): Promise<boolean> {
        const user = await repository.aluno.findFirst({
            where: {
                authToken: token,
            },
        });

        return !!user;
    }
}
