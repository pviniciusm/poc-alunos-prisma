import { Request, Response } from "express";
import repository from "../database/prisma.connection";

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
}
