import repository from "../database/prisma.connection";
import { CreateProjetoDto } from "../dtos/projeto.dto";
import { Result } from "../dtos/service.dto";
import { Projeto } from "../models/projeto.model";

export class ProjetoService {
    public async create(params: CreateProjetoDto): Promise<Result> {
        const aluno = await repository.aluno.findFirst({
            where: {
                id: params.alunoId,
            },
        });

        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }

        const projeto = new Projeto(params.descricao, params.ferramenta, "E");

        await repository.projeto.create({
            data: {
                descricao: params.descricao,
                ferramenta: params.ferramenta,
                status: projeto.status,
                alunoId: params.alunoId,
            },
        });

        return {
            code: 201,
            message: "Projeto criado com sucesso",
            data: projeto.toJson(),
        };
    }

    public async list(alunoId: string): Promise<Result> {
        const aluno = await repository.aluno.findFirst({
            where: {
                id: alunoId,
            },
        });

        if (!aluno) {
            return {
                code: 404,
                message: "Aluno not found",
            };
        }

        const result = await repository.projeto.findMany({
            where: {
                alunoId,
            },
        });

        return {
            code: 200,
            message: "Projetos listados com sucesso",
            data: result.map((item) => this.mapToModel(item)),
        };
    }

    public mapToModel(projeto: any) {
        const model = new Projeto(
            projeto.descricao,
            projeto.ferramenta,
            projeto.status
        );

        model.id = projeto.id;

        return model;
    }
}
