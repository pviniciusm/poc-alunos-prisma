import { Request, Response } from "express";

import repository from "../database/prisma.connection";
import { Avaliacao } from "../models/avaliacao.model";

export class AvaliacaoController {
    public async list(req: Request, res: Response) {
        try {
            const { idAluno } = req.params;

            // Verifica se o aluno existe
            const aluno = await repository.aluno.findUnique({
                where: {
                    id: idAluno,
                },
            });

            // Se o aluno não existe, retorna 404
            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno does not exist",
                });
            }

            // Lista todos os alunos do banco de dados
            const result = await repository.avaliacao.findMany({
                where: {
                    idAluno,
                },
                // Faz um JOIN com outra tabela (aluno)
                include: {
                    aluno: {
                        // Traz apenas o ID e o nome do aluno no JOIN
                        select: {
                            id: true,
                            nome: true,
                        },
                    },
                },
            });

            res.status(200).send({
                ok: true,
                data: result,
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
            const { idAluno } = req.params;
            const { disciplina, nota } = req.body;

            // Valida os campos obrigatórios
            if (!disciplina || !nota) {
                return res.status(400).send({
                    ok: false,
                    message: "Fields not provided.",
                });
            }

            const notaNum = Number(nota);
            if (notaNum < 0 || notaNum > 10) {
                return res.status(400).send({
                    ok: false,
                    message: "Nota must be between 0 and 10",
                });
            }

            // Verifica se o aluno existe
            const aluno = await repository.aluno.findUnique({
                where: {
                    id: idAluno,
                },
            });

            // Se o aluno não existe, retorna 404
            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno does not exist",
                });
            }

            // Cria a instância da avaliação (model)
            const avaliacao = new Avaliacao(disciplina, nota);

            // Salva a avaliação no banco de dados
            const result = await repository.avaliacao.create({
                data: {
                    id: avaliacao.id,
                    idAluno: aluno.id,
                    disciplina,
                    nota,
                },
            });

            res.status(201).send({
                ok: true,
                data: result,
                message: "Avaliacao successfully created",
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
            const { idAluno, idAvaliacao } = req.params;
            const { disciplina, nota } = req.body;

            // Valida os campos obrigatórios
            if (!disciplina || !nota) {
                return res.status(400).send({
                    ok: false,
                    message: "Fields not provided.",
                });
            }

            const notaNum = Number(nota);
            if (notaNum < 0 || notaNum > 10) {
                return res.status(400).send({
                    ok: false,
                    message: "Nota must be between 0 and 10",
                });
            }

            // Verifica se o aluno existe
            const aluno = await repository.aluno.findUnique({
                where: {
                    id: idAluno,
                },
            });

            // Se o aluno não existe, retorna 404
            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno does not exist",
                });
            }

            // Salva a avaliação no banco de dados
            const result = await repository.avaliacao.update({
                where: {
                    id: idAvaliacao,
                },
                data: {
                    disciplina,
                    nota,
                },
            });

            res.status(200).send({
                ok: true,
                data: result,
                message: "Avaliacao successfully updated",
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
            const { idAluno, idAvaliacao } = req.params;

            // Verifica se o aluno existe
            const aluno = await repository.aluno.findUnique({
                where: {
                    id: idAluno,
                },
            });

            // Se o aluno não existe, retorna 404
            if (!aluno) {
                return res.status(404).send({
                    ok: false,
                    message: "Aluno does not exist",
                });
            }

            // Salva a avaliação no banco de dados
            const result = await repository.avaliacao.delete({
                where: {
                    id: idAvaliacao,
                },
            });

            res.status(200).send({
                ok: true,
                data: result,
                message: "Avaliacao successfully deleted",
            });
        } catch (error: any) {
            res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
