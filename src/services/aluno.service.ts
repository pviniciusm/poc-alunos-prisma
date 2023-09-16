import { v4 as createToken } from "uuid";
import repository from "../database/prisma.connection";
import { Aluno } from "../models";

export class AlunoService {
    public async findAll(nome?: string): Promise<Aluno[]> {
        // Lista todos os alunos do banco de dados
        const result = await repository.aluno.findMany({
            // Filtro com where
            where: {
                nome: nome?.toString(),
            },
            // Define quais os campos serão selecionados
            select: {
                password: false,
                id: true,
                nome: true,
                email: true,
                idade: true,
                createdAt: true,
            },
        });

        return result.map((item) => this.mapToModel(item));
    }

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

    public mapToModel(aluno: any) {
        return Aluno.create(
            aluno.id,
            aluno.nome,
            aluno.email,
            aluno.idade,
            aluno.password
        );
    }
}
