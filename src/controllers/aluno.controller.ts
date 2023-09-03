import { Request, Response } from "express";

import repository from "../database/prisma.connection";
import { Aluno } from "../models/aluno.model";

/**
 * Controller com todas as ações a respeito de alunos.
 */
export class AlunoController {
    public async list(req: Request, res: Response) {
        try {
            const { nome } = req.query;

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
}
