import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import jwtService from "../services/jwt.service";

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).send({
                ok: false,
                message: "Authentication token not provided",
            });
        }

        const tokenIsValid = jwtService.validate(authorization);
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
