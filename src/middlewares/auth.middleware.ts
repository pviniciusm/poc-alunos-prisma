import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).send({
                ok: false,
                message: "Authentication token not provided",
            });
        }

        const tokenIsValid = await new AuthService().validateToken(token);
        if (!tokenIsValid) {
            return res.status(401).send({
                ok: false,
                message: "Invalid credentials",
            });
        }

        next();
    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
}
