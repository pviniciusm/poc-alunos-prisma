import { Router } from "express";
import { TurmaController } from "../controllers/turma.controller";

export const turmaRoutes = () => {
    const router = Router();
    const controller = new TurmaController();

    router.get("/", controller.list);
    router.post("/", controller.create);

    return router;
};
