import { Router } from "express";
import { AvaliacaoController } from "../controllers";

export const avaliacaoRoutes = () => {
    const router = Router({
        mergeParams: true,
    });
    const controller = new AvaliacaoController();

    router.get("/", controller.list);
    router.post("/", controller.create);
    router.put("/:idAvaliacao", controller.update);
    router.delete("/:idAvaliacao", controller.delete);

    return router;
};
