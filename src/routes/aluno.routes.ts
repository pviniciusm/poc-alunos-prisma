import { Router } from "express";
import { AlunoController } from "../controllers";
import { avaliacaoRoutes } from "./avaliacao.routes";

export const alunoRoutes = () => {
    const router = Router();
    const controller = new AlunoController();

    router.get("/", controller.list);
    router.post("/", controller.create);

    router.use("/:idAluno/avaliacao", avaliacaoRoutes());

    return router;
};
