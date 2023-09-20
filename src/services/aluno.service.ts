import { CreateAlunoDTO, UpdateAlunoDTO } from "../contracts/aluno.contract";
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

    public async create(params: CreateAlunoDTO) {
        // Cria um novo aluno (model)
        const aluno = new Aluno(
            params.nome,
            params.email,
            params.idade,
            params.password
        );

        // Salva o aluno no banco de dados usando o Prisma
        await repository.aluno.create({
            data: {
                email: params.email,
                nome: params.nome,
                password: params.password,
                id: aluno.id,
                idade: params.idade,
            },
        });

        return aluno.toJson();
    }

    public async update(params: UpdateAlunoDTO) {
        const aluno = await repository.aluno.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!aluno) {
            return null;
        }

        aluno.nome = params.nome ?? aluno.nome;
        aluno.idade = params.idade ?? aluno.idade;

        await repository.aluno.update({
            where: {
                id: params.id,
            },
            data: {
                nome: aluno.nome,
                idade: aluno.idade,
            },
        });

        return this.mapToModel(aluno).toJson();
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
