import { Router } from "express";
import { AlunoController } from "../controllers/aluno.controller";

export const alunoRoutes = () => {
    const router = Router();
    const controller = new AlunoController();

    router.get("/", controller.list);

    return router;
};
