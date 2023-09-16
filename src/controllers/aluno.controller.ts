import { Request, Response } from "express";

import repository from "../database/prisma.connection";
import { Aluno } from "../models/aluno.model";
import { AlunoService } from "../services/aluno.service";

/**
 * Controller com todas as ações a respeito de alunos.
 */
export class AlunoController {
    public async list(req: Request, res: Response) {
        try {
            const { nome } = req.query;

            const service = new AlunoService();
            const result = await service.findAll(nome as string);

            res.status(200).send({
                ok: true,
                data: result.map((item) => item.toJson()),
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async create(req: Request, res: Response) {
        try {
            // Busca os campos do body
            const { nome, email, password, idade } = req.body;

            // Valida se todos os campos foram informados
            if (!nome || !email || !password || !idade) {
                return res.status(400).send({
                    ok: false,
                    message: "Fields not provided",
                });
            }

            // Cria um novo aluno (model)
            const aluno = new Aluno(nome, email, idade, password);

            // Salva o aluno no banco de dados usando o Prisma
            const result = await repository.aluno.create({
                data: {
                    email,
                    nome,
                    password,
                    id: aluno.id,
                    idade,
                },
            });

            res.status(201).send({
                ok: true,
                data: result,
                message: "Aluno successfully created",
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome, idade } = req.body;

            const aluno = await repository.aluno.findUnique({
                where: {
                    id,
                },
            });

            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno not found",
                });
            }

            aluno.nome = nome ?? aluno.nome;
            aluno.idade = idade ?? aluno.idade;

            const result = await repository.aluno.update({
                where: {
                    id,
                },
                data: {
                    nome: aluno.nome,
                    idade: aluno.idade,
                },
            });

            res.status(200).send({
                ok: true,
                data: result,
                message: "Aluno successfully updated",
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const aluno = await repository.aluno.findUnique({
                where: {
                    id,
                },
            });

            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno not found",
                });
            }

            const result = await repository.aluno.delete({
                where: {
                    id,
                },
            });

            res.status(200).send({
                ok: true,
                data: result,
                message: "Aluno successfully deleted",
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
