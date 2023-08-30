import { Router } from "express";

export const alunoRoutes = () => {
    const router = Router();

    router.get("/", (_, res) => {
        res.send("ok");
    });

    return router;
};
