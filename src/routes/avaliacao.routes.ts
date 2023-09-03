import { Router } from "express";
import { AvaliacaoController } from "../controllers";

export const avaliacaoRoutes = () => {
    const router = Router({
        mergeParams: true,
    });
    const controller = new AvaliacaoController();

    router.get("/", controller.list);
    router.post("/", controller.create);

    return router;
};
