import { Request, Response } from "express";

export class AlunoController {
    public async list(req: Request, res: Response) {
        try {
            res.status(200).send("ok");
        } catch (error: any) {
            res.status(500).send(error.toString());
        }
    }
}
