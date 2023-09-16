import { Router } from "express";
import { AlunoController } from "../controllers";
import { avaliacaoRoutes } from "./avaliacao.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

export const alunoRoutes = () => {
    const router = Router();
    const controller = new AlunoController();

    router.get("/", controller.list);
    router.post("/", controller.create);
    router.put("/:id", [authMiddleware], controller.update);
    router.delete("/:id", controller.delete);
    router.post("/login", controller.login);

    router.use("/:idAluno/avaliacao", avaliacaoRoutes());

    return router;
};
